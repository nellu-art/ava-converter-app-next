/**
 * Formats a currency value by adding commas and ensuring two decimal places.
 *
 * @param value - The currency value to format. For example, '1234567.89'.
 * @param blur - Whether to format the value as if the input has lost focus.
 * @returns - The formatted currency value.
 */
export function formatCurrency(value: string, blur?: boolean) {
  // don't validate empty input
  if (value === '') {
    return ''
  }

  // check for decimal
  if (value.indexOf('.') >= 0) {
    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    const decimal_pos = value.indexOf('.')

    // split number by decimal point
    let left_side = value.substring(0, decimal_pos)
    let right_side = value.substring(decimal_pos)

    // add commas to left side of number
    left_side = formatNumber(left_side)

    // validate right side
    right_side = formatNumber(right_side)

    // On blur make sure 2 numbers after decimal
    if (blur) {
      right_side += '00'
    }

    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2)

    // join number by .
    return left_side + '.' + right_side
  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    let result = formatNumber(value)

    // final formatting
    if (blur) {
      result += '.00'
    }

    return result
  }
}

function formatNumber(num: string) {
  // format number 1000000 to 1,234,567
  return num.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
