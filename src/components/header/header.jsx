import styled from "styled-components";
const HeaderLayout = styled.header`
  display: flex;
  justify-content: center;
  padding: 1rem;
  .title {
    font-size: 25px;
  }
`;

const Header = () => {
  return (
    <HeaderLayout>
      <h1 className="title">My to do </h1>
    </HeaderLayout>
  );
};

export default Header;
