const constants = {
  UTMI_CAMPAIGN: "codigodovendedor",
  UTMI_EMPTY: "semcodigo",
  SESSION_STORAGE_KEY: "ZENIR_VENDOR",
  MASTER_DATA_ENDPOINT_PREFIX: "/api/dataentities",
};

async function _sendAttachment(key, value) {
  try {
    return await vtexjs?.checkout
      .getOrderForm()
      .then(() => vtexjs?.checkout?.sendAttachment(key, value));
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

function mountBEMClass(block, element, ...modifiers) {
  try {
    if (!block) return "";

    const getElementAndModifiers = function (str, element, ...modifiers) {
      if (!element) return "";

      str += `__${element}`;

      if (modifiers) {
        str += modifiers
          .map((modifier) => !!modifier && ` ${str}--${modifier}`)
          .filter(Boolean)
          .join("");
      }

      return str;
    };

    return element
      ? getElementAndModifiers(block, element, ...modifiers)
      : function (element, ...modifiers) {
          if (!element) return block;
          return getElementAndModifiers(block, element, ...modifiers);
        };
  } catch (error) {
    console.error(error);
  }
}

function getUrlParameter(name, url) {
  if (!name) {
    return undefined;
  }
  if (!url) {
    if (typeof window !== "undefined") {
      url = window.location.href;
    } else {
      return undefined;
    }
  }
  name = name.replace(/[\[\]]/g, "\\$&");

  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

async function setVendorInOrder(vendor = { codevendor: "", namevendor: "" }) {
  console.log(vendor, "vendor");
  try {
    const { UTMI_CAMPAIGN, UTMI_EMPTY, SESSION_STORAGE_KEY } = constants;

    const vendorData =
      vendor?.codevendor && vendor?.namevendor
        ? `${vendor.codevendor} - ${vendor.namevendor}`
        : "";

    const { orderFormId } = await vtexjs?.checkout?.getOrderForm([
      "openTextField",
      "marketingData",
    ]);

    const data = {
      utmiPart: vendorData ? vendor.codevendor : "",
      utmiCampaign: vendorData ? UTMI_CAMPAIGN : UTMI_EMPTY,
      openTextField: { value: vendorData || null },
    };

    if (vendorData) {
      sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        encodeURIComponent(
          JSON.stringify({
            orderFormId,
            name: vendor.namevendor,
            code: vendor.codevendor,
          })
        )
      );
    } else {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }

    const { marketingData } = await _sendAttachment(
      "openTextField",
      data.openTextField
    );

    const orderForm = await _sendAttachment("marketingData", {
      ...marketingData,
      utmiPart: data.utmiPart,
      utmiCampaign: data.utmiCampaign,
    });

    return Promise.resolve(orderForm);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

async function getVendorByCode(code) {
  try {
    const response = await fetch(
      `${constants.MASTER_DATA_ENDPOINT_PREFIX}/CD/search?_where=codevendor=${code}&_fields=namevendor,codevendor&_schema=v1&an=tfcvih`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/vnd.vtex.ds.v10+json",
        },
      }
    );

    if (!response.ok) throw new Error(response);

    const data = await response.json();

    return Promise.resolve(data?.[0]);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

function removeVendorFromOrder() {
  return setVendorInOrder(null);
}

function errorMessage(text) {
  function remove() {
    $(
      ".vtex-front-messages-placeholder .vtex-front-messages-template"
    ).remove();

    $(".vtex-front-messages-placeholder").removeClass(
      "vtex-front-messages-placeholder-opened"
    );
  }

  function add() {
    $(".vtex-front-messages-placeholder").append(`
        <div
          class="
            vtex-front-messages-template
            vtex-front-message-3
            vtex-front-messages-instance
            vtex-front-messages-type-warning
            vtex-front-messages-template-opened
          "
        >
          <span
            class="vtex-front-messages-title"
            style="display: none"
          ></span>
          <span
            class="vtex-front-messages-separator"
            style="display: none"
          > - </span>
          <span class="vtex-front-messages-detail">
            ${text}
          </span>
        </div>
      `);

    $(".vtex-front-messages-placeholder").addClass(
      "vtex-front-messages-placeholder-opened"
    );
  }

  $(document).on("click", ".vtex-front-messages-placeholder .close", remove);
  setTimeout(remove, 20 * 1000); //tempo padrão da vtex
  add();
}

function sendVendor(value) {
  if (!value) return;
  const $input = $(
    `.discount-code-inputs.input-cod-vendedora .discount-code-inputs__value`
  );

  $input.attr("disable", true).addClass("disable");

  getVendorByCode(value)
    .then((data) => {
      if (data) {
        setVendorInOrder({ ...data });
      } else {
        $input.attr("disable", false).removeClass("disable");
        errorMessage("vendedor não encontrado");
        $(".totalizers.summary-totalizers.cart-totalizers").removeClass(
          "is-loading"
        );
      }
    })
    .catch((data, textStatus, xhr) => {
      $input.attr("disable", false).removeClass("disable");
      errorMessage(textStatus);
      console.error(data, textStatus, xhr);
      $(".totalizers.summary-totalizers.cart-totalizers").removeClass(
        "is-loading"
      );
    });
}

function eventBindingVendor(name) {
  const bemClass = mountBEMClass("discount-code-inputs");
  $("body").on("submit", `.${bemClass()}-form.form-${name}`, (event) => {
    event.preventDefault();
    console.log(event, "event");
    sendVendor($(".discount-code-inputs__value").val());
    $(".totalizers.summary-totalizers.cart-totalizers").addClass("is-loading");
  });
  $("body").on(
    "click",
    `.${bemClass()}.input-${name} .${bemClass("action")}--remove`,
    () => {
      removeVendorFromOrder();
      localStorage.setItem("sellerCode", "");
      $(".totalizers.summary-totalizers.cart-totalizers").addClass(
        "is-loading"
      );
    }
  );
}

function bindVendorCodeParameter() {
  try {
    const parameterValue = getUrlParameter("utm_campaign")?.split(" - ")[0];

    if (parameterValue) sendVendor(parameterValue);
  } catch (error) {
    console.error("erro no codigo do cupom", error);
  }
}

async function renderInput(data) {
  const bemClass = mountBEMClass("discount-code-inputs");
  const value = data?.value
    ? data.value?.split("-")?.[1]
      ? data.value
      : data.value?.split("-")?.[0]?.trim() || ""
    : "";

  const empty = !value ? "empty-code" : "";
  const $field = $(`.${bemClass()}-form`).find(
    `.${bemClass()}.input-${data.name}`
  );

  if ($field.length) {
    $field.remove();
  }

  const valueCodeComponent = localStorage.getItem("sellerCode");
  const validationValueCodeComponent =
    valueCodeComponent === null ? "" : valueCodeComponent;

  if (validationValueCodeComponent) {
    const sellerInfo = await getVendorByCode(
      validationValueCodeComponent
    );

    if (sellerInfo) {
      if (!vtexjs?.checkout?.orderForm?.openTextField?.value) {
        await _sendAttachment("openTextField", {
          value: `${sellerInfo.codevendor} - ${sellerInfo.namevendor}`,
        });
      }

      $(
        ".summary-totalizers .totalizers.summary-totalizers.cart-totalizers"
      ).removeClass("is-loading");


      setTimeout(() => {
        const exists = $(
          "form.discount-code-inputs-form.form-cod-vendedora"
        ).length;

        if (!exists) {
          $(".forms.coupon-column.summary-coupon-wrap.text-center").prepend(`
            <form class="${bemClass()}-form form-${data.name}" autocomplete="off">
              <div class="${bemClass()} ${empty} input-${data.name}">
                <label class="${bemClass("name")}">${data.label}</label>
                <div class="remove" style="display: flex">
                  <span class="${bemClass("text")}">
                    ${sellerInfo.codevendor} - ${sellerInfo.namevendor}
                  </span>
                  <button type="button" class="${bemClass("action", "remove")}">
                    excluir
                  </button>
                </div>
              </div>
            </form>
          `);
        } else {
          $(".discount-code-inputs.input-cod-vendedora .add").hide();
          $(".discount-code-inputs.input-cod-vendedora .remove").show();
          $("span.discount-code-inputs__text").text(
            `${sellerInfo.codevendor} - ${sellerInfo.namevendor}`
          );
        }
      }, 1500)

      return;
    }
  }

  $(
    ".summary-totalizers .totalizers.summary-totalizers.cart-totalizers"
  ).removeClass("is-loading");

  $(".forms.coupon-column.summary-coupon-wrap.text-center").prepend(`
      <form class="${bemClass()}-form form-${data.name}" autocomplete="off">
        <div class="${bemClass()} ${empty} input-${data.name}">
          <label class="${bemClass("name")}">${data.label}</label>
          <div class="add">
            <input
              class="${bemClass("value")}"
              placeholder="${data.placeholder}"
              type="text"
              value="${validationValueCodeComponent}"
            />
            <button type="submit" class="${bemClass("action", "add")}">
              Ok
            </button>
          </div>
          <div class="remove">
            <span class="${bemClass("text")}">
              ${value}
            </span>
            <button type="button" class="${bemClass("action", "remove")}">
              excluir
            </button>
          </div>
        </div>
      </form>
    `);
}

function DiscountCodeInputsEvents() {
  eventBindingVendor("cod-vendedora");
  bindVendorCodeParameter();
}

function validarRG(rg) {
  rg = rg.replace(/[^\d]/g, "");

  if (rg.length < 7) {
    return false;
  }

  if (/^(\d)\1+$/.test(rg)) {
    return false;
  }

  return true;
}

function addInputValue() {
  const hash = window.location.hash.replace("#/", "");

  if (hash === "shipping") {
    setInterval(() => {
      if (hash === "shipping") {
        setTimeout(() => {
          if (
            $("#shp-pickup-document_id").length <= 0 &&
            $(".vtex-omnishipping-1-x-container.shp-pickup-receiver").length
          ) {
            $("#btn-go-to-payment").prop("disabled", true);
            $(".vtex-omnishipping-1-x-container.shp-pickup-receiver").append(`
              <div id="shp-pickup-document_id" class="shp-pickup-document">
                <label class="shp-pickup-document__label" for="cpf">RG de quem vai retirar:</label>
                <input 
                  id="cpf"
                  type="text" 
                  class="shp-pickup-document__input" 
                  placeholder="Digite seu RG (somente números)" 
                  required
                />
                <span class="error">Campo Obrigatório</span>
              </div>
            `);

            $("#cpf").on("blur", function () {
              if (validarRG($(this).val())) {
                $(this).parent().find(".error").remove();
                $("#btn-go-to-payment").prop("disabled", false);
              } else {
                if ($(this).parent().find(".error").length) {
                  $(this)
                    .parent()
                    .find(".error")
                    .html("<p>Documento invalido</p>");
                }
                $("#btn-go-to-payment").prop("disabled", true);
              }
            });
          }
        }, 2000);
      }
    }, 1500);
  }
}

function sendDocumentOrderForm() {
  const documentValue = $("#cpf").val();
  const receiverName = $("#pickup-receiver").val();
  const orderFormId = vtexjs?.checkout?.orderForm?.orderFormId;

  if (documentValue.trim() !== "") {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const raw = JSON.stringify({
      receiver_name: receiverName,
      rg: documentValue,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `/api/checkout/pub/orderForm/${orderFormId}/customData/document`,
      requestOptions
    )
      .then((response) => response.text())
      .catch((error) => console.log("error", error));
  } else {
    $("#cpf").parent().find(".error").html("<p>Documento invalido</p>");
  }
}

$(window).on("ready hashchange", function () {
  const hash = window.location.hash.replace("#/", "");

  if (hash === "shipping") {
    addInputValue();

    const stopExecution = setInterval(() => {
      $("#btn-go-to-payment").on("click", function () {
        sendDocumentOrderForm();
        $("#btn-go-to-payment").addClass("custom-event");
      });
    }, 1500);

    if ($("#btn-go-to-payment").hasClass("custom-event")) {
      return clearInterval(stopExecution);
    }
  }
});

function DiscountCodeInputsRender(orderForm) {
  renderInput({
    label: "Código do vendedor",
    name: "cod-vendedora",
    value: orderForm?.openTextField?.value?.replace(" - Vazio", ""),
    placeholder: "digite seu código",
  });
}

$(window).on("orderFormUpdated.vtex", (_, orderForm) => {
  DiscountCodeInputsRender(orderForm);
});

function pressCalc() {
  setTimeout(() => {
    $("#shipping-calculate-link").trigger("click");
  }, 2000);
}

$(document).ready(function () {
  if (window.location.href.indexOf("cart") > -1) {
    $(".caminho-checkout").append(
      `<img src='/arquivos/caminho-checkout-1.png'/>`
    );

    pressCalc();
  }
  setTimeout(() => {
    DiscountCodeInputsEvents();
  }, 1000);

  window.onhashchange = function () {
    if ($(".caminho-checkout")) {
      $(".caminho-checkout").html("");
    }

    if (window.location.href.indexOf("cart") > -1) {
      $(".caminho-checkout").append(
        `<img src='/arquivos/caminho-checkout-1.png/> `
      );
    } else if (window.location.href.indexOf("profile") > -1) {
      $(".caminho-checkout").append(
        `<img src='/arquivos/caminho-checkout-2.png'/> `
      );
    } else if (window.location.href.indexOf("shipping") > -1) {
      $(".caminho-checkout").append(
        `<img src='/arquivos/caminho-checkout-3.png'/> `
      );
      changeInputType();
    } else if (window.location.href.indexOf("payment") > -1) {
      $(".caminho-checkout").append(
        `<img src='/arquivos/caminho-checkout-4.png'/> `
      );
    }
  };
  document
    .querySelectorAll(".checkout-steps > div")
    .forEach(function (element) {
      $(element).on("click", function () {
        window.location.hash = `#/${$(this).attr("id")}`;
      });
    });
});
(function () {
  function init() {
    activeStepBar();
  }

  function activeStepBar() {
    $(window).on("ready hashchange", function () {
      const hash = window.location.hash.replace("#/", "");

      const steps = [
        {
          name: "cart",
        },
        {
          name: "profile",
        },
        {
          name: "shipping",
        },
        {
          name: "payment",
        },
      ];

      const findIndex = steps.findIndex((item) => item.name === hash);

      function activateStep(name) {
        const element = $(`#${name}`);
        element.addClass("active");
        $(`#${name} + span`).addClass("active");
      }

      function inactiveStep(name) {
        const element = $(`#${name}`);
        element.removeClass("active");
        $(`#${name} + span`).removeClass("active");
      }

      steps.forEach((item, index) => {
        if (index < findIndex) {
          activateStep(item.name);
        } else if (index > findIndex) {
          inactiveStep(item.name);
        }

        if (index === findIndex) {
          const element = $(`#${item.name}`);
          element.addClass("active");
          $(`#${item.name} + span`).removeClass("active");
        }
      });
    });
  }

  init();
})();
