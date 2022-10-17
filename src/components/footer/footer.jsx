import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = ({ pathName }) => {
  return (
    <FooterLayout>
      {pathName === "/" && (
        <p>
          아직 회원이 아니신가요? <Link to="/join">가입하러 가기</Link>
        </p>
      )}
      {pathName === "/join" && (
        <p>
          이미 회원이신가요? <Link to="/">로그인하기</Link>
        </p>
      )}
    </FooterLayout>
  );
};

export default Footer;

const FooterLayout = styled.footer`
  display: flex;
  justify-content: center;
  padding-top: 16px;

  a {
    color: #3cb043;
    font-weight: 700;
  }
  a:hover {
    color: #32612d;
  }
`;
