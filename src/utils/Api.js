export const API = {
  fetchMainCategory : () => fetch('/data/data.json').then(res => res.json())
}