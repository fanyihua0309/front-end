describe("登录", () => {
  it("第一次进入系统，默认重定向到登录页面 /sign/in", () => {
    window.cy.visit("/");
    window.cy.location("hash").should("equal", "#/sign/in");
  });

  it("在登录页面点击注册链接，重定向到注册页面", () => {
    window.cy.visit("/#/sign/in");
    window.cy.get("a").click();
    window.cy.location("hash").should("equal", "#/sign/up");
  });

  it("在注册页面，正确填写所有字段，可以注册成功", () => {
    cy.visit("/#/sign/up");

    cy.get("#register_nickname").type(Cypress.env("defaultUser").nickname);
    cy.get("#register_phone").type("18106987193");
    cy.get("#register_email").type(Cypress.env("defaultUser").email);
    cy.get("#register_password").type(Cypress.env("defaultUser").password);
    cy.get("#register_confirm").type(Cypress.env("defaultUser").password);

    cy.get('[type="submit"]').click();
    cy.contains("注册成功!").should("be.visible");
  });

  it("注册的时候有做校验（必填校验和格式校验）", () => {
    cy.visit("/#/sign/up");

    cy.get("#register_nickname")
      .type(Cypress.env("defaultUser").nickname)
      .clear()
      .then(() => {
        cy.get(".ant-form-item-explain-error")
          .should("exist")
          .should("contain", "请输入昵称");
      });

    cy.get("#register_phone")
      .type(Cypress.env("defaultUser").mobile)
      .clear()
      .then(() => {
        cy.get(".ant-form-item-explain-error")
          .should("exist")
          .should("contain", "请输入手机号");
      });

    cy.get("#register_phone")
      .type("123")
      .then(() => {
        cy.get(".ant-form-item-explain-error")
          .should("exist")
          .should("contain", "请输入正确的手机号");
      });

    cy.get("#register_email")
      .type(Cypress.env("defaultUser").email)
      .clear()
      .then(() => {
        cy.get(".ant-form-item-explain-error")
          .should("exist")
          .should("contain", "请输入邮箱");
      });

    cy.get("#register_email")
      .type("123")
      .then(() => {
        cy.get(".ant-form-item-explain-error")
          .should("exist")
          .should("contain", "请输入正确的邮箱地址");
      });

    cy.get("#register_password")
      .type(Cypress.env("defaultUser").password)
      .clear()
      .then(() => {
        cy.get(".ant-form-item-explain-error")
          .should("exist")
          .should("contain", "请输入密码");
      });

    cy.get("#register_confirm")
      .type(Cypress.env("defaultUser").password)
      .clear()
      .then(() => {
        cy.get(".ant-form-item-explain-error")
          .should("exist")
          .should("contain", "请输入确认密码");
      });
  });

  it("重复注册会报错", () => {
    cy.request({
      url: "http://localhost:4000/sign/up",
      method: "post",
      body: Cypress.env("defaultUser"),
    })
      .its("body")
      .should("contain.keys", ["code"])
      .its("code")
      .should("not.equal", 0);
  });

  it("用刚才注册的手机号和密码来登录，可以正常登录", () => {
    cy.visit("/#/sign/in");

    cy.get("#normal_login_username").type(Cypress.env("defaultUser").mobile);
    cy.get("#normal_login_password").type(Cypress.env("defaultUser").password);

    cy.get(".ant-btn").click();
    window.cy.location("hash").should("equal", "#/user/home");
  });

  it("用错误的手机号登录，会报错", () => {
    cy.request({
      url: "http://localhost:4000/sign/in",
      method: "post",
      body: { mobile: "18106987192", password: "123456" },
    })
      .its("body")
      .should("contain.keys", ["code"])
      .its("code")
      .should("not.equal", 0);
  });

  it("用错误的密码登录，会报错", () => {
    cy.request({
      url: "http://localhost:4000/sign/in",
      method: "post",
      body: { mobile: "18106987196", password: "111111111" },
    })
      .its("body")
      .should("contain.keys", ["code", "err", "msg"])
      .its("code")
      .should("not.equal", 0);
  });

  it("必须登录才能看到管理员主页", () => {
    cy.visit("/#/admin/show");

    cy.get(".ant-table").should("not.exist");
  });

  it("可以退出登录", () => {
    cy.visit("/#/user/personal", {
      onBeforeLoad(win) {
        win.localStorage.setItem("user_id", 5);
        win.localStorage.setItem("user_nickname", "小范");
      },
    });

    cy.get(".ant-btn-dangerous").click();
    window.cy.location("hash").should("equal", "#/sign/in");
  });
});
