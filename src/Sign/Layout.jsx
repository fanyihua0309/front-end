import "../App.less"
// import { Divider } from 'antd';


const SignPage = ({ formLable, render }) => {

  return (
    // <div className="sign-page">
    //   <h1 className="title">数据库管理系统</h1>
    //   <div id="sign-form">
    //     {/* <Divider style={{borderWidth: "2px", display: "inline"}}> */}
    //       {/* <span className="form-lable"> */}
    //         {/* {formLable} */}
    //       {/* </span> */}
    //     {/* </Divider>  */}
    //     {/* <span>{formLable}</span> */}
    //     {render}
    //   </div>
    // </div>
    <main id="sign-page">
      <div id="sign-form">
        {/* <label id="sign-form-label">
          {formLable}
        </label> */}
        {render}
      </div>
    </main>
  );
}

export default SignPage;