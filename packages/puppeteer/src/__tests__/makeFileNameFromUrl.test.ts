import makeFileNameFromUrl from '../makeFileNameFromUrl'

// A simple example test
describe('makeFileNameFromUrl()', () => {
  it('should use the hostname if no path is present', () => {
    expect(makeFileNameFromUrl('https://npaprocal.com')).toBe(
      `npaprocal.com-${Math.round(new Date().getTime() / 1000)}`
    )
  })

  it('should prefer a hyphenated version of the path if possible', () => {
    expect(
      makeFileNameFromUrl(
        'https://npaprocal.com/org/sumo-creations/cal/231/start/20181201/end/20181231'
      )
    ).toBe(
      `sumo-creations-cal-231-start-20181201-end-20181231-${Math.round(
        new Date().getTime() / 1000
      )}`
    )
  })
})
