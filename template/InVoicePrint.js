const InVoicePrint = (orderData, status) => {
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
  <div>
  <div className="p-10 bg-white ">
    <div
      className=" w-full flex "
      style={{ border: '2px solid black', height: '24vh', overflow: 'auto' }}
    >
      <div className="w-3/4 p-2">
        <div className="flex flex-row w-full ">
          <div className="w-2/3">
            <div className="uppercase text-3xl font-semibold py-2">OHM WhOLESALE</div>

            <div className="uppercase text-base font-semibold ">390-03 KNICKBOKER EVE</div>
            <div className="uppercase text-base font-semibold ">BOHEMIA NY 11716</div>
            <div className="flex flex-row ">
              <div
                className="uppercase  font-semibold "
                style={{ fontSize: '14px', width: '130px' }}
              >
                Warehouese
              </div>
              <div className="">+1-613-319-1550</div>
            </div>
            <div className="flex flex-row">
              <div
                className="uppercase  font-semibold"
                style={{ fontSize: '14px', width: '130px' }}
              >
                Toll free
              </div>
              <div>+1-613-319-1550</div>
            </div>
            <div className="flex flex-row">
              <div
                className="uppercase  font-semibold"
                style={{ fontSize: '14px', width: '130px' }}
              >
                Fax #
              </div>
              <div>+1-613-319-1550</div>
            </div>
            <div className="flex flex-row">
              <div
                className="uppercase  font-semibold"
                style={{ fontSize: '14px', width: '130px' }}
              >
                Email{' '}
              </div>
              <div className="font-medium">wholesale@masterdistro.com</div>
            </div>
            <div className="flex flex-row">
              <div
                className="uppercase  font-semibold"
                style={{ fontSize: '14px', width: '130px' }}
              >
                Website{' '}
              </div>
              <div className="  font-medium">www.masterdistro.com</div>
            </div>
          </div>
          <div className="mt-6 ">
            <img
              src={logo1}
              alt="OHM Wholesale"
              style={{ height: 100, width: 200, marginRight: '20px' }}
            />
          </div>
        </div>
      </div>
      <div className="w-1/4 " style={{ borderLeft: '2px solid black' }}>
        <div
          className="font-semibold text-3xl italic  text-center"
          style={{ borderBottom: '2px solid black' }}
        >
          InVoice
        </div>
        <div className="flex flex-row w-full ">
          <div className="w-1/2 ">
            <div
              className="text-center"
              style={{ borderBottom: '2px solid black', borderRight: '2px solid black' }}
            >
              Tax ID#
            </div>
            <div
              className="text-center font-semibold py-2"
              style={{ borderBottom: '2px solid black', borderRight: '2px solid black' }}
            >
              --
            </div>
          </div>
          <div className="w-1/2">
            <div className="text-center" style={{ borderBottom: '2px solid black' }}>
              Ship Via
            </div>
            <div
              className="text-center font-semibold py-2"
              style={{ borderBottom: '2px solid black' }}
            >
              --
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-1/2 ">
            <div
              className="text-center"
              style={{ borderBottom: '2px solid black', borderRight: '2px solid black' }}
            >
              Date
            </div>
            <div
              className="text-center font-semibold py-2"
              style={{ borderBottom: '2px solid black', borderRight: '2px solid black' }}
            >
              --
            </div>
          </div>
          <div className="w-1/2">
            <div className="text-center" style={{ borderBottom: '2px solid black' }}>
              Invoice #
            </div>
            <div
              className="text-center font-semibold py-2"
              style={{ borderBottom: '2px solid black' }}
            >
              --
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-1/2 ">
            <div
              className="text-center"
              style={{ borderBottom: '2px solid black', borderRight: '2px solid black' }}
            >
              Terms
            </div>
            <div
              className="text-center font-medium py-2 "
              style={{
                borderBottom: '2px solid black',
                borderRight: '2px solid black',
              }}
            >
              --
            </div>
          </div>
          <div className="w-1/2">
            <div className="text-center" style={{ borderBottom: '2px solid black' }}>
              Due Date
            </div>
            <div
              className="text-center font-semibold py-2"
              style={{ borderBottom: '2px solid black' }}
            >
              --
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className="w-full flex  h-full"
      style={{ overflow: 'auto', border: '2px solid black' }}
    >
      <div className=" w-1/2 h-full">
        <div style={{ borderRight: '2px solid black' }}>
          <div className="h-1/3 p-2 text-base" style={{ borderBottom: '3px solid black' }}>
            Bill To
          </div>
          <div className="p-2 h-2/3">
            <div>OHM WHOLESALE</div>
            <div>846 WOLCOTT ST</div>
            <div>WATERBURY CT 06705</div>
          </div>
        </div>
      </div>
      <div className=" w-1/2 h-full">
        <div className="h-1/3 p-2 text-base" style={{ borderBottom: '3px solid black' }}>
          Ship To
        </div>
        <div className="p-2 h-2/3">
          <div className="uppercase">${orderData?.address?.address_line_1}</div>
          <div className="uppercase">
            ${orderData?.address?.city} ,${orderData?.address?.state_code}
          </div>
          <div className="uppercase">
            ${orderData?.address?.country_code || "United States Of America"}
          </div>
        </div>
      </div>
    </div>
    <div className=" " style={{ overflow: 'auto', border: '2px solid black' }}>
      <div className="flex">
        <div
          className="w-1/6  font-semibold"
          style={{
            borderRight: '2px solid black',
            fontSize: 16,
            textAlign: 'center',
            height: '30px',
            borderBottom: '2px solid black',
          }}
        >
          Quantity
        </div>
        <div
          className="w-3/6 font-semibold "
          style={{
            borderRight: '2px solid black',
            fontSize: 16,
            textAlign: 'center',
            height: '30px',

            borderBottom: '2px solid black',
          }}
        >
          Description
        </div>
        <div
          className="w-1/6  font-semibold"
          style={{
            borderRight: '2px solid black',
            fontSize: 16,
            textAlign: 'center',
            height: '30px',

            borderBottom: '2px solid black',
          }}
        >
          Rate
        </div>
        <div
          className="w-1/6  font-semibold"
          style={{
            fontSize: 16,
            textAlign: 'center',
            borderBottom: '2px solid black',
            height: '30px',
          }}
        >
          Amount
        </div>
      </div>
     

      <div className="flex">
      <div
        className="w-1/6"
        style={{
          height: '45vh',
          borderRight: '2px solid black',
        }}
      >
        {orderData?.productData?.map((item) => {
          return (
            <div key={item?._id} className="text-center">
              <div
                className=" font-medium"
                style={{
                  fontSize: 16,
                  height: "30px",

                  textAlign: "center",
                }}
              >
                {item.quantity}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="w-3/6"
        style={{
          height: '45vh',
          borderRight: '2px solid black',
        }}
      >
        {orderData?.productData?.map((item) => {
          return (
            <div key={item?._id} className="text-center">
              <div
                className=" font-medium"
                style={{
                  fontSize: 13,
                  textAlign: "center",
                  height: "30px",
                }}
              >
                {item.sku}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="w-1/6"
        style={{
          height: '45vh',
          borderRight: '2px solid black',
        }}
      >
        {orderData?.productData?.map((item) => {
          return (
            <div key={item?._id} className="text-center">
              <div
                className=" font-medium"
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  height: "30px",
                }}
              >
                {item.price}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="w-1/6"
        style={{
          height: '45vh',
        }}
      >
        {orderData?.productData?.map((item) => {
          return (
            <div key={item?._id} className="text-center">
              <div
                className=" font-medium"
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  height: "30px",
                }}
              >
                {item.price * item.quantity}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>

















    </div>
    <div
      className="w-full flex "
      style={{
        height: '12vh',
        border: '2px solid black',
      }}
    >
      <div className="w-4/6 ">
        <div
          className="font-semibold pt-2 px-2"
          style={{ height: '100%', borderRight: '2px solid black' }}
        >
          <div className="font-semibold text-base uppercase">
            * No return or replacements, All Sales are final
          </div>
          <div className="font-semibold text-base uppercase">
            * Buys are responsible for all taxes
          </div>
          <div className="font-semibold text-base uppercase">* $70 returned Check fee</div>
          <div className="font-semibold text-base uppercase">* Company T&C apply</div>
        </div>
      </div>
      <div
        className="w-1/6 "
        style={{
          height: '12vh',
          borderRight: '2px solid black',
        }}
      >
        <div
          className=" font-semibold text-lg text-center pt-2"
          // style={{ borderBottom: '1px solid black', height: '33%' }}
        >
          Sub Total
        </div>

        <div
          className=" font-semibold text-lg text-center"
          // style={{ borderBottom: '1px solid black', height: '33%' }}
        >
          Tax
        </div>
        <div
          className=" font-semibold text-lg text-center"
          // style={{ borderBottom: '1px solid black', height: '33%' }}
        >
          Total
        </div>
      </div>
      <div
        className="w-1/6 "
        style={{
          height: '12vh',
        }}
      >
        <div
          className=" font-semibold text-lg text-center pt-2"
          // style={{ borderBottom: '1px solid black', height: '33%' }}
        >
          $${orderData?.subTotal}
        </div>

        <div
          className=" font-semibold text-lg text-center"
          // style={{ borderBottom: '1px solid black', height: '33%' }}
        >
          $${orderData?.tax || 0}
        </div>
        <div
          className=" font-semibold text-lg text-center"
          // style={{ borderBottom: '1px solid black', height: '33%' }}
        >
          $${orderData?.total}
        </div>
      </div>
    </div>
  </div>
</div>
</body>
  
</html>
  `;
};
module.exports = InVoicePrint;
