function correct(string) {
  if (string.length <= 20) {
    return true;
  } else {
    return false;
  }
}

correct();

function palindrome(string) {
  const cleaned = string.toLowerCase().replace(/[^a-z0-9а-яё]/gi, '');
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

palindrome();

function getNumbers(string) {
  return string.replace(/\D/g, '');
}

getNumbers();
