using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

[Serializable]
public class State
{
    public List<StateObject> stateObjects;
   
    public State(List<GameObject> gameObjects)
    {
        stateObjects = new List<StateObject>();
        foreach (GameObject g in gameObjects)
        {
            StateObject s = new StateObject(g);
            stateObjects.Add(s);
        }
    }
}
