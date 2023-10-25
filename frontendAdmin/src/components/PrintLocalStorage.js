function PrintLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log('PrintLocalStorage');
    console.log(`${key}: ${value}`);
  }

  return null;
}

export default PrintLocalStorage
