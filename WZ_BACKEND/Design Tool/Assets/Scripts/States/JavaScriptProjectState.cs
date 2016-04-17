using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

[Serializable]
public class JavaScriptProjectState {
    public List<JavaScriptState> states;
    public List<string> modelNames;

    public JavaScriptProjectState(Dictionary<int,State> stateDict, List<string> modelNames)
    {
        this.modelNames = modelNames;
        Dictionary<int,State>.Enumerator enumerator = stateDict.GetEnumerator();
        states = new List<JavaScriptState>();
        while(enumerator.MoveNext())        
        {
         State s = enumerator.Current.Value;
          states.Add(new JavaScriptState(s));   
        }
    }

    public string toJson()
    {
      return JsonUtility.ToJson(this);
    }
}

[Serializable]
public class JavaScriptState
{
    public string name;
    public int id;
    public List<JavaScriptStateObject> stateObjects;

    public JavaScriptState(State s)
    {
        stateObjects = new List<JavaScriptStateObject>();
        name = s.name;
        id = s.id;
        Dictionary<int,StateObject>.Enumerator enumerator = s.stateObjects.GetEnumerator();
        while(enumerator.MoveNext())
        {
            StateObject so = enumerator.Current.Value;
            stateObjects.Add(new JavaScriptStateObject(so));
        }
    }
}

[Serializable]
public class JavaScriptStateObject
{
    public string instanceName;
    public int id;
    public bool isClickable;
    public int stateTransitionId;

    public JavaScriptStateObject(StateObject so){
        instanceName = so.instanceName;
        id = so.id;
        stateTransitionId = so.transitionStateId;
    }
}
