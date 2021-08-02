import styled from '@emotion/styled';
import { css } from '@emotion/react';

const dynamicStyle = props => css`
            color: ${props.color}; font-size: ${props.size}`;

const TextContainer = styled.div`${dynamicStyle}`;

export default TextContainer;