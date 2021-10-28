export function getFromBody(params) {
  let fromBody = [];

  for (let property in params) {
    let encodeKey = encodeURIComponent(property); //`user-name`=> 'user%20name'
    let encodeValue = encodeURIComponent(params[property]); // sonu 123 =>sonu%0123

    fromBody.push(encodeKey + '=' + encodeValue);
  }

  return fromBody.join('&'); //username=sonu&password=123
}
