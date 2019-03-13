exports.objectIsEmpty = function(object)
{
  for(var property in object)
  {
    if(object.hasOwnProperty(property))
    {
      return false;
    }
  }
  return true;
}
