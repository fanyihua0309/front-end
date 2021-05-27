import "../App.less"


const SignPage = ({ children }) => {

  return (
    <main id="sign-page">
      <div id="sign-form">
        { children }
      </div>
    </main>
  );
}

export default SignPage;