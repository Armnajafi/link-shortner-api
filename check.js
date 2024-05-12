function check_national_code(meli_code)
{
     if (meli_code.length == 10){
          if(meli_code=='1111111111' ||
          meli_code=='0000000000' ||
          meli_code=='2222222222' ||
          meli_code=='3333333333' ||
          meli_code=='4444444444' ||
          meli_code=='5555555555' ||
          meli_code=='6666666666' ||
          meli_code=='7777777777' ||
          meli_code=='8888888888' ||
          meli_code=='9999999999' )
          {
               return false;
          }
          c = parseInt(meli_code.charAt(9));
          n = parseInt(meli_code.charAt(0))*10 +
          parseInt(meli_code.charAt(1))*9 +
          parseInt(meli_code.charAt(2))*8 +
          parseInt(meli_code.charAt(3))*7 +
          parseInt(meli_code.charAt(4))*6 +
          parseInt(meli_code.charAt(5))*5 +
          parseInt(meli_code.charAt(6))*4 +
          parseInt(meli_code.charAt(7))*3 +
          parseInt(meli_code.charAt(8))*2;
          r = n - parseInt(n/11)*11;
          if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)){
               return true;
          }
          else{
               return false;
          }
     }
     else{
          return false;
     }
}

function check_phone_number(phone_number){
     var regex = new RegExp("^(\\+98|0)?9\\d{9}$");
     var result = regex.test(phone_number);
     return result;
}

function check_home_number(home_number){
     var regex = new RegExp("^0[0-9]{2,}[0-9]{7,}$");
     var result = regex.test(home_number)
     return result;
}

function check_zipcode_number(zip_code){
     var pattern = /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/gm;
     if(pattern.test(zip_code) == false ) return false;
     return true;
}