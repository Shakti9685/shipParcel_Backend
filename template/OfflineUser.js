const Offlineuser = (user, password) => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <title>New Assignment</title>
     
      <!--
          MS Outlook custom styles
        -->
      <!--[if mso 12]>
          <style type="text/css">
            .flexibleContainer{display:block !important; width:100% !important;}
          </style>
        <![endif]-->
      <!--[if mso 14]>
          <style type="text/css">
            .flexibleContainer{display:block !important; width:100% !important;}
          </style>
        <![endif]-->
    </head>
    
    <body bgcolor="#FFFFFF" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
      <center style="background-color:#fff;">
        <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTbl" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;">
          <tr>
            <td align="center" valign="top" id="bodyCell">
    
              <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="500" id="emailHeader">
                <tr>
                  <td align="center" valign="top">
    
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center" valign="top">
    
                          <table border="0" cellpadding="10" cellspacing="0" width="500" class="flexibleContainer">
                            <tr>
                              <td valign="top" width="500" class="flexibleContainerCell">
    
                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                    <td align="left" valign="middle" id="invisibleIntroduction" class="flexibleContainerBox" style="display:none;display:none !important;">
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:100%;">
                                        <tr>
                                          <td align="left" class="textContent">
                                            <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#828282;text-align:center;line-height:120%;">
                                              Here you can put short introduction of your email template.
                                            </div>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
    
                        </td>
                      </tr>
                    </table>
    
                  </td>
                </tr>
              </table>
    
              <table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody">
    
                <tr>
                  <td align="center" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#2E7D32">
                      <tr>
                        <td align="center" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                            <tr>
                              <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                  <tr>
                                    <td align="center" valign="top" class="textContent">
                                      <h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;">Hi ${user?.firstName} ${user?.lastName}</h1>

                                      <h2 style="text-align:center;font-weight:normal;font-family:Helvetica,Arial,sans-serif;font-size:23px;margin-bottom:10px;color:#fff;line-height:135%;"> Welcome to OHM WholeSale</h2>

                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8">
                      <tr>
                        <td align="center" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                            <tr>
                              <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                  <tr>
                                    <td align="center" valign="top">
    
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                          <td align="center" valign="top" class="textContent">
                                         
                                         
                                          <h3 style="text-align:center;color:#000;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:23px;font-weight:normal;margin-top:0;margin-bottom:3px;"> Credentials :</h3>
                                      <h1 style="color:#000;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:normal;margin-bottom:5px;text-align:center;">Username: <span style="color:#006400;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:normal;margin-bottom:5px;text-align:center;">${user?.userName} </span></h1>
                                      <h1 style="color:#000;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:normal;margin-bottom:5px;text-align:center;">Password: <span style="color:#006400;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:normal;margin-bottom:5px;text-align:center;">${password} </span></h1>
                                      <h1 style="color:#000;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:normal;margin-bottom:5px;text-align:center;">**Don't share your credentials with anyone</h1>
                                      <h1 style="color:#006400;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:25px;font-weight:normal;margin-top:10px;text-align:center;">Please click below to login:</h1>
                                          
                                          </td>
                                        </tr>
                                      </table>
    
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
    
                <tr>
                  <td align="center" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F8F8F8">
                      <tr>
                        <td align="center" valign="top">
                          <table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer">
                            <tr>
                              <td align="center" valign="top" width="500" class="flexibleContainerCell">
                                <table border="0" cellpadding="30" cellspacing="0" width="100%">
                                  <tr>
                                    <td align="center" valign="top">
                                      <table border="0" cellpadding="0" cellspacing="0" width="50%" class="emailButton" style="background-color: #006400;">
                                        <tr>
                                          <td align="center" valign="middle" class="buttonContent" style="padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px;">
                                            <a href="https://www.ohmwholesales.com/auth/login" style="color:#FFFFFF;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:17px;line-height:100%;" >Click</a>
                                          </td>
                                        </tr>
                                      </table>
    
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
    
              </table>
    
              <!-- footer -->
            
              <!-- // end of footer -->
    
            </td>
          </tr>
        </table>
      </center>
    </body>
    
    </html>
  
  `;
};
module.exports = Offlineuser;
