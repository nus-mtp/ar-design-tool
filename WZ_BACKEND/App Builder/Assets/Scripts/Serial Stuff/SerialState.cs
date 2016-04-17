#if UNITY_EDITOR
using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

[Serializable]
public class SerialState
{
    public String name;
    public List<SerialStateObject> stateObjects;
    public int id;
 
}
#endif
