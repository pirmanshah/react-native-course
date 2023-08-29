export function formatRupiah(angka) {
  // Konversi angka menjadi string dan hapus semua karakter selain angka
  const strAngka = angka?.toString().replace(/[^0-9]/g, '');

  // Jika string angka kosong, kembalikan '0'
  if (strAngka === '') {
    return '0';
  }

  // Format angka dengan separator ribuan (.)
  const ribuan = strAngka?.length % 3;
  let rupiah = strAngka?.substr(0, ribuan);
  const ribuanArray = strAngka?.substr(ribuan).match(/\d{3}/g);

  if (ribuanArray) {
    const separator = ribuan ? '.' : '';
    rupiah += separator + ribuanArray.join('.');
  }

  // Tambahkan 'Rp' di depan angka
  return `Rp ${rupiah}`;
}
