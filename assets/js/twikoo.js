document.addEventListener("DOMContentLoaded", function () {
  // 提示信息的内容
  var hints = {
    nick: "输入QQ号会获取头像、昵称和QQ邮箱",
    mail: "当评论收到回复，会邮箱通知你",
    link: "你的网站，非必填",
  };

  Object.keys(hints).forEach(function (name) {
    var inputElement = document.querySelector(
      '.el-input__inner[name="' + name + '"]'
    );

    inputElement.addEventListener("focus", function () {
      createOrUpdateHint(inputElement, hints[name]);
    });

    inputElement.addEventListener("blur", function () {
      removeHint();
    });
  });

  function createOrUpdateHint(inputElement, hintText) {
    // 移除已存在的提示，以避免重复
    removeHint();

    // 创建新的提示元素
    var hint = document.createElement("div");
    hint.setAttribute("id", "customHint");
    hint.style.color = "#fff";
    hint.style.backgroundColor = "#444444";
    hint.style.fontSize = "13px";
    hint.style.padding = "8px";
    hint.style.position = "absolute";
    hint.style.borderRadius = "var(--card-border-radius)";
    hint.style.bottom = "100%"; // 使其显示在输入框上方
    hint.style.left = "50%";
    hint.style.width = "max-content";
    hint.style.transform = "translateX(-50%)";
    hint.style.marginBottom = "10px";
    hint.style.boxShadow = "var(--shadow-l1)";
    hint.style.pointerEvents = "none";
    hint.textContent = hintText;

    // 将提示元素添加到输入框的父元素中
    inputElement.parentNode.insertBefore(hint, inputElement);
  }

  function removeHint() {
    var hint = document.querySelector("#customHint");
    if (hint) {
      hint.remove();
    }
  }
});
