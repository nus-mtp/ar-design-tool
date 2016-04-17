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
    
   
    public SerialState(State s)
    {
        name = s.name;
        stateObjects = new List<SerialStateObject>();
        Dictionary<int, StateObject>.Enumerator enumerator = s.stateObjects.GetEnumerator();
        
        while(enumerator.MoveNext())
        {
            StateObject so = enumerator.Current.Value;
            SerialStateObject sso = new SerialStateObject(so);
            stateObjects.Add(sso);
        }
        id = s.id;
    }
}
