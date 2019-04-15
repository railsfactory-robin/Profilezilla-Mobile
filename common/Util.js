import CountryStateData from './CountryState'

const countries = CountryStateData

export function convertDate (dateString) {
  if (dateString) {
    let p = dateString.split(/\D/g)
    return [p[2], p[1], p[0]].join("-")
  }
}

export function getCountries() {
  return countries.map((country) => {
    const name = country[0]
    return {'value': name, 'label': name}
  })
}

export function getStates(countryName = 'India') {
  if(!countryName) { return [] }

  let states = []
  countries.forEach((country) => {
    if (country[0] === countryName) {
      states = country[2].split('|');
      return
    }
  })
  return states.map((name) => {
    const stateName = name.split('~')[0]
    return {'value': stateName, 'label': stateName}
  })
}

export const genderOptions = [
  {
    label: 'Male',
    value: "male",
  },
  {
    label: 'Female',
    value: "female",
  }
]

export const maritalOptions =[
  {
    label: 'Unmarried',
    value: "unmarried"
  },
  {
    label: 'Married',
    value: "married"
  }
]

export const addressOptions =[
  {
    label: 'Same as Current Address',
    value: "same"
  },
  {
    label: 'New Address',
    value: "new"
  }
]

export const typeOptions =[
  {
    label: 'Part Time',
    value: "Part time"
  },
  {
    label: 'Full Time',
    value: "Full time"
  },
  {
    label: 'Distance Education',
    value: "Distance education"
  }
]

export const gpaOptions =[
  {
    label: 'GPA',
    value: "gpa"
  },
  {
    label: 'Percentage',
    value: "percentage"
  }
]