import styled from "@emotion/styled";

export const PrimaryButton = styled.button`
    background-color: #0095f6;
    border: 1px solid transparent;
    color: #fff;
    min-width: 100%;
    padding: 6px;
    font-weight: 700;
    line-height: 18px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:disabled{
        background-color: #7eccff;
    }
`;