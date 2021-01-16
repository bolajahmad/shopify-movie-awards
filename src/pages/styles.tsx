import styled from 'styled-components';
import { device } from '../models';

export const ShoppiesPageWrapper = styled.div`
  background-color: var(--color-gray-75);
  min-height: 100vh;

  .toast_notif {
    position: fixed;
    background: white;
    z-index: 200;
    left: 30%;
    border: 1px solid var(--sec-color);
    border-radius: 1em;
    padding: 1em;
    top: 20%;
    right: 20%;
    bottom: 30%;
    margin: 0 auto;
    box-shadow: 0 0 5px 3px silver;

    & > .btn {
      position: absolute;
      width: 2em;
      height: 2em;
      top: 5%;
      right: 5%;
    }

    .wrapper {
      padding: 2em;
      text-align: center;

      & > * + * {
        margin-top: 3em;
      }

      .icon {
        width: 5em;
        height: 5em;
        margin: 3em auto;
        padding: 1em;
        border-radius: 50%;
        background: red;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: radial-gradient(hsla(347, 85%, 33%, 0.822) 30%, 
                          hsla(347, 40%, 33%, 0.822) 60%, 
                          hsla(0deg, 30%, 50%, 0.76) 80%
                        );
      }

      .btn_wrapper {
        display: flex;
        align-items: center;
        justify-content; space-between;

        & > .btn {
          width: 40%;
        }
      }
    }
  }

  header {
    .navbar {
      padding: 0 1em;
      max-width: 100vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--bg-color-80);

      .nav {
        display: flex;
        align-items: center;
        width: 30em;
      }

      .menu_wrapper {
        display: none;
      }
    }
  }

  .main {
    padding-top: 2em;
    max-width: 1000px;
    margin: 0 auto;

    .main_wrapper {
      display: flex;
      flex-wrap: wrap;

      > div {
        width: 70%;
        margin-right: 2em;
        flex: 1;
      }
    }
  }

  .main .sidebar {
    padding: 0 1em;
    display: block;
    transition: all 0.5s ease-in;

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

        .menu_wrapper {
          display: block;
          width: 4em;
        }
      }
    }

    .main .sidebar {
      position: fixed;
      z-index; 150;
      left: 0%;
      top: 0;
      margin: 0;
      width: 20em;
      max-width: 80vw;
      padding-top: 5em;
      overflow: auto;
      min-height: 100vh;
      background-color: var(--bg-color);
      background: linear-gradient(transparent 10%, var(--bg-color) 30%);
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
      background: none;
      background-color: var(--bg-color);
      width: 30em;

      .nominations {
        .form_wrapper {
          display: block;
          margin: 2em 0;
        }
      }
    }
  }
`;
