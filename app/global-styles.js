import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    overflow: auto;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    color: #5c5c5c;
  }
  #app {
    min-height: 100%;
    min-width: 100%;
  }
  #app > div > div {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  p,
  label {
    line-height: 1.5em;
  }
  a {
    font-size: 14px;
    color: #ee4832;
    text-decoration: none;
  }

  a, button {
    cursor: pointer;
  }

  .red {
    color: #ee4832;
  }
  .black-grey {
    color: #36373c;
  }
  .dark-grey {
    color: #5c5c5c;
  }
  .medium-grey {
    color: #b4b4b4;
  }
  .light-grey {
    color: #f1f1f2;
  }
  .center {
    text-align: center;
    margin: 0 auto;
  }
  .row {
    margin-top: 50px;
  }
  .subtitle {
    font-size: 23px;
  }
  .dark {
    color: #333333;
  }
  .dark-grey-2 {
    color: #070708;
  }
  .red-back {
    background-color: #ee4832;
  }
  .green-back {
    background-color: #5AB84B;
  }
  .blue-back {
    background-color: #5699D2;
  }
  .left {
    float: left;
  }
  .right {
    float: right;
  }
`;
