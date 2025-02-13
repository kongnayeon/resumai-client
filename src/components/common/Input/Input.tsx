/* eslint-disable react/display-name */
import {
  ForwardedRef,
  InputHTMLAttributes,
  ReactNode,
  forwardRef
} from 'react';
import styled from '@emotion/styled';
import { theme } from '@/styles';
import { Flex } from '@/components/Wrapper';

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  value: string;
  errorText?: string;
  isError?: boolean;
  height?: number;
  width?: number;
  multiline?: boolean;
  rightElement?: ReactNode;
  maxLength?: number;
}

/**
 * @default {HTMLInputElement} or {HTMLTextAreaElement}
 *
 * @param {string} value: input value
 * @param {string} errorText?: 에러 메시지
 * @param {boolean} isError?: 에러 여부
 * @param {number} height?: 높이 (defult: 52px)
 * @param {boolean} multiline?: 여러 줄 (default: false)
 * @param {ReactNode} rightElement?: 오른쪽에 들어갈 수 있는 element
 * @param {number} maxLength?: 최대 글자수
 */
export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      value,
      placeholder = '내용 입력',
      errorText,
      isError = false,
      width,
      height = 80,
      multiline = false,
      maxLength,
      rightElement,
      ...props
    },
    ref
  ) => {
    return (
      <Container width={width}>
        <Flex align="flex-start">
          {multiline ? (
            <TextAreaContainer
              direction="column"
              align="flex-end"
              gap={8}
              isError={isError}>
              <StyledTextArea
                {...props}
                ref={ref as ForwardedRef<HTMLTextAreaElement>}
                placeholder={placeholder}
                spellCheck={false}
                isError={isError}
                width={width}
                height={height}>
                {value}
              </StyledTextArea>
              {maxLength && (
                <p>
                  <span>{value === undefined ? '0' : value?.length}</span>
                  &nbsp;/&nbsp;
                  {maxLength}
                </p>
              )}
            </TextAreaContainer>
          ) : (
            <InputContainer value={value} isError={isError}>
              <StyledInput
                {...props}
                ref={ref as ForwardedRef<HTMLInputElement>}
                placeholder={placeholder}
                spellCheck={false}
                isError={isError}
                width={width}
                height={height}
              />
              {maxLength && (
                <p>
                  <span>{value === undefined ? '0' : value?.length}</span>
                  &nbsp;/&nbsp;
                  {maxLength}
                </p>
              )}
              {rightElement}
            </InputContainer>
          )}
        </Flex>
        <StyledHelperTextBox>
          {errorText && <StyledHelperText>{errorText}</StyledHelperText>}
        </StyledHelperTextBox>
      </Container>
    );
  }
);

const Container = styled(Flex)<{ width?: number }>`
  flex-direction: column;
  align-items: flex-start;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
`;

const StyledHelperTextBox = styled.div`
  margin-top: 6px;

  color: ${theme.palette.bg_light};
`;

const TextAreaContainer = styled(Flex)<{
  value?: string | number | readonly string[] | undefined;
  isError?: boolean;
}>`
  position: relative;
  width: 100%;

  color: ${({ value }) =>
    value ? theme.palette.bg_light : theme.palette.bg_main};

  p {
    ${theme.typo.main_text};
  }

  span {
    color: ${({ value, isError }) =>
      isError
        ? theme.palette.bg_light
        : value
          ? theme.palette.bg_light
          : theme.palette.bg_light};
  }
`;

const InputContainer = styled.div<{
  value?: string | number | readonly string[] | undefined;
  isError?: boolean;
}>`
  position: relative;
  width: 100%;

  color: ${({ value }) =>
    value ? theme.palette.bg_light : theme.palette.bg_light};

  span {
    color: ${({ value, isError }) =>
      isError
        ? theme.palette.bg_light
        : value
          ? theme.palette.bg_light
          : theme.palette.bg_light};
  }

  svg,
  p {
    position: absolute;
    right: 23px;
    top: 50%;
    transform: translateY(-50%);
    ${theme.typo.sub_title};

    cursor: pointer;
  }

  p {
    right: 16px;
    cursor: default;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-text-fill-color: ${theme.palette.bg_light};
    //글자색
  }
`;
const StyledInput = styled.input<{
  isError: boolean;
  height?: number;
  width?: number;
}>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? height : 50)}px;
  padding: 14px 16px;

  box-sizing: border-box;

  background: ${theme.palette.white};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.gray2};

  ${theme.typo.sub_text};
  color: ${theme.palette.gray4};

  & + div {
    color: ${theme.palette.bg_light};
  }

  & + div {
    color: ${({ isError }) =>
      isError ? theme.palette.bg_light : 'transparent'};
  }

  ::placeholder {
    color: ${theme.palette.gray4};
  }
`;

const StyledTextArea = styled.textarea<{
  height?: number;
  width?: number;
  isError?: boolean;
}>`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ height }) => (height ? height : 92)}px;
  padding: 25px;

  box-sizing: border-box;

  background: ${theme.palette.white};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.gray2};
  resize: none;

  ${theme.typo.main_text};
  color: ${theme.palette.gray4};

  ::placeholder {
    color: ${theme.palette.gray4};
  }
`;

const StyledHelperText = styled.p`
  ${theme.typo.main_text};
  color: ${theme.palette.bg_light};
`;
