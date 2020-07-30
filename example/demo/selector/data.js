
const testData = []
for (let i = 1; i < 6; i++) {
  const data = {
    optionContent: '选项内容' + i,
    optionDescribe: '描述内容' + i,
    disabled: i === 4,
    test: 'test',
  }
  testData.push(data)
}

export default testData;