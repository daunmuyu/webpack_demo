export default function tongji(param) {
  if (window._hmt) {
    try {
      window._hmt.push(param);
    } catch (e) {
      console.log(e);
    }
  }
}
