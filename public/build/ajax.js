function customAjax(data) {
  $.ajax({
    url: 'captcha.php',
    method: 'POST',
    'data': {
      'devices': data.devices,
      'captcha': grecaptcha.getResponse()
    },
    success: (res) => {
      let resObj = JSON.parse(res);
      if(resObj.verified) {
        data.quote = resObj.quote;
        sendEmail(data);
      }
    },
    error: (err) => {
      if(fbAd()) {
        fbq('track', 'Invalid Form (Possible Bot)', {
          name: data.name,
          email: data.email,
        });
      }
      resetForm();
      console.log('ERROR:', err);
    }
  })
}
