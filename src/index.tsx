import React, { CSSProperties, FC, HTMLAttributes } from 'react';
import { useInView } from 'react-intersection-observer';
import { animated, config as springConfig, SpringConfig, useSpring } from 'react-spring';

export interface AppearProps extends HTMLAttributes<HTMLDivElement> {
    delay?: number;
    from?: CSSProperties;
    to?: CSSProperties;
    config?: SpringConfig | keyof typeof springConfig;
    as?: keyof JSX.IntrinsicElements;
    threshold?: number | number[];
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * A custom Thing component. Neat!
 */

const Appear: FC<AppearProps> = ({
    children,
    delay,
    from = { opacity: 0.5, transform: 'translateY(20vh)' },
    to = { opacity: 1, transform: 'translateY(0)' },
    config = springConfig.molasses,
    threshold,
    ...rest
}) => {
    const [ref, isInView] = useInView({ triggerOnce: true, threshold });
    const props = useSpring({
        ...(isInView ? to : from),
        config: typeof config === 'string' ? springConfig[config] : config,
        delay,
    });
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        <animated.div {...rest} ref={ref} style={{ ...rest.style, ...props }}>
            {children}
        </animated.div>
    );
};

export { Appear };
