import styled from 'styled-components';
import { device } from '../models';

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

      .nav {
        display: flex;
        align-items: center;
        width: 30em;
      }

      .btn_wrapper {
        display: none;
      }
    }
  }

  .main {
    margin-top: 2em;
    .main_wrapper {
      display: flex;
      flex-wrap: wrap;

      > div {
        width: 70%;
        flex: 1;
      }
    }
  }

  .main .sidebar {
    width: 20em;
    padding: 0 1em;

    .nominations {
      .form_wrapper {
        display: none;
      }
    }

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

  @media screen and ${device.tablet} {
    header {
      .navbar {
        .nav {
        }

        .btn_wrapper {
          display: block;
          width: 4em;
        }
      }
    }

    .main .sidebar {
      position: fixed;
      right: 0%;
      top: 5.5em;
      margin: 0;
      width: 30em;
      min-height: 100vh;
      background-color: var(--bg-color);
    }
  }

  @media screen and ${device.mobileL} {
    header {
      .navbar {
        .nav {
          display: none;
        }
      }
    }

    .main .sidebar {
      .nominations {
        .form_wrapper {
          display: block;
          margin: 2em 0;
        }
      }
    }
  }
`;
