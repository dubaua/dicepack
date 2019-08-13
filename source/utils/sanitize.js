/*
  Remove spaces and turn lowercaase
*/

const sanitize = string => string.replace(/\s/g, '').toLowerCase();

export default sanitize;