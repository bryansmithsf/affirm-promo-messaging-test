var publicKey = "UBCT8NKARKH7Z5OR";
var privateKey = "";
runAffirm();

/* get api keys to use Affirm.js */
$('#api_keys').submit(function(e) {
  e.preventDefault();

  publicKey = $("#public_key").val();
  console.log("Public Key: " + publicKey);

  privateKey = $("#private_key").val();
  console.log("Private Key: " + privateKey);

  runAffirm();
});


function runAffirm() {
  /* BEGIN AFFIRM.JS */
  _affirm_config = {
    public_api_key: publicKey,
    script: "https://cdn1-sandbox.affirm.com/js/v2/affirm.js"
  };
  (function(l, g, m, e, a, f, b) {
    var d, c = l[m] || {},
      h = document.createElement(f),
      n = document.getElementsByTagName(f)[0],
      k = function(a, b, c) {
        return function() {
          a[b]._.push([c, arguments])
        }
      };
    c[e] = k(c, e, "set");
    d = c[e];
    c[a] = {};
    c[a]._ = [];
    d._ = [];
    c[a][b] = k(c, a, b);
    a = 0;
    for (b = "set add save post open empty reset on off trigger ready setProduct".split(" "); a < b.length; a++) d[b[a]] = k(c, e, b[a]);
    a = 0;
    for (b = ["get", "token", "url", "items"]; a < b.length; a++) d[b[a]] = function() {};
    h.async = !0;
    h.src = g[f];
    n.parentNode.insertBefore(h, n);
    delete g[f];
    d(g);
    l[m] = c
  })(window, _affirm_config, "affirm", "checkout", "ui", "script", "ready");
  /* END AFFIRM.JS */
}


//"Buy with Affirm" button event handler
$("#checkout").click(function() {
  console.log("click!");

  /* Hard coded checkout object */
  affirm.checkout({

    "merchant": {
      "user_cancel_url": "",
      "user_confirmation_url": "https://www.affirm.com",
      "user_confirmation_url_action": "POST"
    },

    "metadata": {
      "mode": "modal"
    },
    "order_id": "this is the order number",

    //shipping contact
    "shipping": {
      "name": {
        "first": "Bryan",
        "last": "Smith"
        // You can also include the full name
        // "full" : "John Doe"
      },
      "address": {
        "line1": "650 California St.",
        "line2": "Floor 9",
        "city": "San Francisco",
        "state": "CA",
        "zipcode": "94108"
      },
      "email": "bryan.smith@affirm.com",
      "phone_number": "4155555555"
    },

    // cart 
    "items": [{
      "display_name": "Shelf 02",
      "sku": "SHELF-02",
      "unit_price": 99997,
      "qty": 1,
      "item_image_url": "https://cdn.shopify.com/s/files/1/1823/9587/products/Artifox_Shelf-black_Gallery_01_361096ba-08e0-4186-8b45-5fa49e3e7158_2048x2048.jpg?v=1503086467",
      "item_url": "https://cdn.shopify.com/s/files/1/1823/9587/products/Artifox_Shelf-black_Gallery_01_361096ba-08e0-4186-8b45-5fa49e3e7158_2048x2048.jpg?v=1503086467",
    }],

    // pricing / charge amount
    "currency": "USD",
    "discounts": {
      "savemoney123": {
        "discount_amount": 500
      }
    },
    "tax_amount": 199,
    "shipping_amount": 399,
    "total": 99997
  });

	//Use this for Direct API checkout
  /* affirm.checkout.open({
    onFail: function(a) {
      console.log(a)
    },
    onSuccess: function(a) {
      console.log(a)
      alert(a.checkout_token);
    }
  }); */
	
	//Use this for VCN checkouts
	affirm.checkout.open_vcn({
      success: function(card_checkout) {
         console.log(card_checkout);
      },
      error: function(error_response) {
        console.log(error_response);
      }   
 });
 
});
