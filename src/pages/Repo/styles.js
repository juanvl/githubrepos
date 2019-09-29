import styled, { keyframes } from 'styled-components';

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    margin-top: 10px;
    font-size: 24px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  ${({ issues }) => !issues && 'height: 100vh'}

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

export const IssueList = styled.ul`
  min-height: 470px;
  margin-top: 15px;
  border-top: 1px solid #eee;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: purple;
          }
        }

        span {
          background-color: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Filter = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  select {
    width: 150px;
    height: 40px;
    font-family: 'Open Sans', 'Helvetica Neue', 'Segoe UI', 'Calibri', 'Arial',
      sans-serif;
    font-size: 18px;
    color: #60666d;
  }
`;

export const Pagination = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;

  svg {
    cursor: pointer;
  }

  ${({ firstPage }) =>
    firstPage &&
    `
    #left {
      cursor: not-allowed;
    }
  `}
`;
