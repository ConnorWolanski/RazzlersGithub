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

exports.createActivationKey = function()
{
  // choose 36 because it includes a-z and 0-9
  return Math.random().toString(36).substr(2);
}
