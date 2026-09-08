import { forwardRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './ZoomWrapper.css';

const ZoomWrapper = forwardRef(function ZoomWrapper(
  { children, onScaleChange, panningDisabled },
  ref
) {
  return (
    <TransformWrapper
      ref={ref}
      initialScale={1}
      minScale={0.6}
      maxScale={2.5}
      centerOnInit
      centerZoomedOut
      doubleClick={{ mode: 'toggle', step: 0.7 }}
      wheel={{ step: 0.15, activationKeys: ['Control'] }}
      pinch={{ step: 5 }}
      panning={{
        disabled: panningDisabled,
        velocityDisabled: true,
        allowLeftClickPan: true,
        // Só o eixo vertical é arrastável livremente (o pedido do usuário é
        // "arrastar para cima/baixo"). Travar o eixo X evita que o pan da
        // lib de zoom dispute o gesto horizontal que o react-pageflip usa
        // para virar página — cada gesto continua reconhecido por uma lib
        // só, sem os dois competindo pelo mesmo arraste.
        lockAxisX: true,
      }}
      onTransformed={(_, state) => onScaleChange?.(state.scale)}
    >
      <TransformComponent wrapperClass="zoom-wrapper__outer" contentClass="zoom-wrapper__inner">
        {children}
      </TransformComponent>
    </TransformWrapper>
  );
});

export default ZoomWrapper;
