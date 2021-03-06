
describe('babel-plugin-jsx-mi2', () => {

  // translation implementation
  var TRANS = {name:'Name', city:'City'};
  function t(code){ return TRANS[code] ||code;}

  it('should translate', () => {
    const vnode = render(h => <div city={'city'} city_name={t('city')+' '+t('name')}>{'name'}: test</div>)
    
    expect(vnode.tag).toEqual('div')
    expect(vnode.children[0]).toEqual('Name')
    expect(vnode.children[1]).toEqual(': test')
    expect(vnode.attr.city).toEqual('City')
    expect(vnode.attr.city_name).toEqual('City Name')
  })

  function render(callback){
    return callback(createElement);
  }

  function createElement(tag, attr, ...children){
    return {tag, attr, children};
  }

})

