import { Fragment, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { getCategory } from '../../data/categories.js';
import { getBrand } from '../../data/brands.js';
import { getProduct, getProductsByBrand } from '../../data/products.js';
import { shuffle } from '../../utils/shuffle.js';
import ProductCard from '../ProductCard/ProductCard.jsx';
import './CategoryPage.css';

// Trava de segurança para o preenchimento automático (seção 4 abaixo) — nunca
// deixa o laço de tentativas rodar indefinidamente, mesmo num catálogo grande.
const MAX_AUTOFILL_EXTRAS = 10;

export default function CategoryPage({ page }) {
  const category = getCategory(page.categoryId);
  const baseGroups = page.groups;

  const bodyRef = useRef(null);
  const gridRef = useRef(null);
  // Pilha com o índice do bloco de cada extra adicionado, na ordem em que
  // entrou — ao estourar o espaço, desfazemos sempre o mais recente primeiro.
  const additionStackRef = useRef([]);
  // IDs que já foram tentados e não couberam no tamanho de página atual —
  // evita ficar batendo (adiciona → estoura → remove → tenta o mesmo de
  // novo) até que um redimensionamento abra espaço de novo.
  const rejectedRef = useRef(new Set());

  const [extraByIndex, setExtraByIndex] = useState(() => baseGroups.map(() => []));
  const [resizeTick, setResizeTick] = useState(0);

  /*
   * Pool de produtos "extras" compatíveis por bloco: mesma marca do bloco e
   * mesma categoria da página (nas páginas de Destaques, que já são uma
   * vitrine cruzando categorias, aceitamos qualquer categoria da marca,
   * menos outro item de destaque). Embaralhado uma única vez por página —
   * a ordem em que o preenchimento os consome é aleatória, mas nunca inclui
   * produto de marca diferente da do bloco nem inventa dado novo.
   */
  const candidatePools = useMemo(() => {
    const usedBase = new Set(baseGroups.flatMap((g) => g.productIds));
    return baseGroups.map((group) => {
      const pool = getProductsByBrand(group.brand).filter((p) => {
        if (usedBase.has(p.id)) return false;
        if (page.categoryId === 'destaques') return p.category !== 'destaques';
        return p.category === page.categoryId;
      });
      return shuffle(pool).map((p) => p.id);
    });
    // Uma vez por montagem da página — não repetir o sorteio a cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
   * Preenchimento automático do espaço sobrando (item 4 do pedido): mede a
   * altura real do grid já renderizado contra o espaço realmente disponível
   * na página.
   *   - Se o conjunto atual estourou o espaço, desfaz o extra mais recente
   *     (e lembra que ele não coube, pra não tentar de novo à toa).
   *   - Se sobra espaço e existe candidato compatível/não usado/não
   *     rejeitado, adiciona mais um (rodízio entre os blocos).
   *   - Se não sobra espaço ou não há mais candidato, não faz nada — a
   *     página fica como está até o próximo redimensionamento real.
   * Reage tanto a mudanças no próprio conjunto quanto a redimensionamentos
   * (resizeTick), então a quantidade se ajusta se a janela crescer/encolher,
   * em vez de ficar travada no tamanho de tela do primeiro carregamento.
   */
  useLayoutEffect(() => {
    const body = bodyRef.current;
    const grid = gridRef.current;
    if (!body || !grid) return;
    const available = body.clientHeight;
    if (available === 0) return; // página ainda não visível/medível no flipbook

    if (grid.scrollHeight > available) {
      const idx = additionStackRef.current.pop();
      if (idx !== undefined) {
        setExtraByIndex((prev) => {
          const next = prev.map((arr) => arr.slice());
          const removedId = next[idx][next[idx].length - 1];
          if (removedId) rejectedRef.current.add(removedId);
          next[idx] = next[idx].slice(0, -1);
          return next;
        });
      }
      return;
    }

    const totalExtras = extraByIndex.reduce((sum, arr) => sum + arr.length, 0);
    if (totalExtras >= MAX_AUTOFILL_EXTRAS) return;

    const used = new Set([
      ...baseGroups.flatMap((g) => g.productIds),
      ...extraByIndex.flat(),
      ...rejectedRef.current,
    ]);
    let targetIndex = -1;
    let pickedId = null;
    for (let offset = 0; offset < candidatePools.length; offset += 1) {
      const idx = (totalExtras + offset) % candidatePools.length;
      const candidate = candidatePools[idx]?.find((id) => !used.has(id));
      if (candidate) {
        targetIndex = idx;
        pickedId = candidate;
        break;
      }
    }
    if (pickedId === null) return; // nada compatível sobrando — para aqui

    additionStackRef.current.push(targetIndex);
    setExtraByIndex((prev) => {
      const next = prev.map((arr) => arr.slice());
      next[targetIndex] = [...next[targetIndex], pickedId];
      return next;
    });
  }, [extraByIndex, resizeTick, candidatePools, baseGroups, page.categoryId]);

  /*
   * react-pageflip mantém todas as páginas montadas, mas só dá dimensões
   * reais à(s) página(s) visível(is) no momento — o restante fica com
   * altura 0 até o leitor navegar até ela. O mesmo ResizeObserver cobre os
   * dois casos: a primeira vez que a página ganha um tamanho real, e
   * qualquer redimensionamento de janela/zoom depois disso — limpando as
   * rejeições antigas para dar uma nova chance aos candidatos se a página
   * ficou maior.
   */
  useLayoutEffect(() => {
    const body = bodyRef.current;
    if (!body || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(() => {
      rejectedRef.current = new Set();
      setResizeTick((t) => t + 1);
    });
    observer.observe(body);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="category-page">
      <header className="category-page__header">
        <h3>{category.name}</h3>
      </header>

      <div className="category-page__body" ref={bodyRef}>
        {/*
          Um único grid contínuo para a página inteira: grupos de uma marca só
          ganham um cabeçalho de seção (linha cheia) quando têm 2+ produtos ou
          um subtítulo — um grupo de 1 produto já mostra a marca no próprio
          card, então economizamos a linha inteira e deixamos os cards de
          marcas diferentes dividirem a mesma fileira do grid.
        */}
        <div
          className={`category-page__grid ${page.featured ? 'category-page__grid--featured' : ''}`}
          ref={gridRef}
        >
          {baseGroups.map((group, index) => {
            const brand = getBrand(group.brand);
            const curated = group.productIds.map(getProduct).filter(Boolean);
            const extras = extraByIndex[index].map(getProduct).filter(Boolean);
            const products = [...curated, ...extras];
            const showHeader = products.length > 1 || Boolean(group.subtitle);
            const groupKey = `${group.brand}-${group.subtitle ?? ''}`;
            return (
              <Fragment key={groupKey}>
                {showHeader && (
                  <h4 className="category-page__brand-title">
                    {brand?.name}
                    {group.subtitle ? ` — ${group.subtitle}` : ''}
                  </h4>
                )}
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} size={page.featured ? 'lg' : 'md'} />
                ))}
              </Fragment>
            );
          })}
        </div>
      </div>

      <p className="category-page__disclaimer">
        Consulte nossa equipe comercial para disponibilidade e condições.
      </p>
    </div>
  );
}
