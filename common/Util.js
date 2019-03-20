export function convertDate (dateString) {
  if (dateString) {
    let p = dateString.split(/\D/g)
    return [p[2], p[1], p[0]].join("-")
  }
}