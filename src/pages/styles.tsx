import styled from 'styled-components';

export const ShoppiesPageWrapper = styled.div`
  background-color: var(--color-gray-75);
  min-height: 100vh;

  header {
    .navbar {
      padding: 0 1em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--bg-color-80);
    }
  }

  .main {
    margin-top: 2em;
    .main_wrapper {
      display: flex;

      > div {
        width: 70%;
      }
    }
  }

  .main .sidebar {
    width: 20em;
    padding: 0 1em;

    .alert_box {
      display: block;
      text-align: center;
      color: white;
      padding: 1em;
      border-radius: 0.5em;
      margin: 1em auto 2em;

      &.info {
        border: 1px solid var(--color-info);
        background-color: var(--color-info);
      }

      &.success {
        border: 1px solid var(--color-success);
        background-color: var(--color-success);
      }
    }
  }

  .footer {
    margin-top: 2em;
    text-align: center;
  }
`;
