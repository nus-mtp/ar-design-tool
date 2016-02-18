using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class State {
    public string name;
    public List<StateObject> stateObjects;
    public GameObject activeGameObject;
    public StateObject activeStateObject;

    public State()
    {
        stateObjects = new List<StateObject>();
    }

    public void AddToState(GameObject g)
    {
        StateObject so = new StateObject(g);
        stateObjects.Add(so);
    }

    public  void AddToState(StateObject s)
    {
        stateObjects.Add(s);
    }

    public string SetActiveGameObject(GameObject o)
    {
       string instanceName = null;
       foreach(StateObject s in stateObjects)
        {
            if (o == s.gameObject)
            {
                if (activeGameObject != null)
                {
                    activeGameObject.GetComponent<Transformable>().destroyElements();
                }
                activeGameObject = s.gameObject;
                activeStateObject = s;
                activeGameObject.GetComponent<Transformable>().initializeObjects();
                instanceName = s.instanceName;
                break;
            }
        }

        return instanceName;
    }

    public void Hide()
    {
       foreach(StateObject s in stateObjects)
       {
           s.Hide();
       }
       if (activeGameObject != null)
       {
           Transformable t = activeGameObject.GetComponent<Transformable>();
           t.destroyElements();
       }
    }

    public void Destroy()
    {
        if (activeGameObject != null)
        {
            Transformable t = activeGameObject.GetComponent<Transformable>();
            t.destroyElements();
        }
        foreach (StateObject s in stateObjects)
        {
            MonoBehaviour.Destroy(s.gameObject);
        }

    }

    public void Show()
    {
        foreach (StateObject s in stateObjects)
        {
            s.Show();
        }
        if (activeGameObject != null)
        {
            activeGameObject.GetComponent<Transformable>().initializeObjects();
        }
    }

    public void RemoveActiveObject()
    {
        activeGameObject.GetComponent<Transformable>().destroyElements();
        stateObjects.Remove(activeStateObject);
        MonoBehaviour.Destroy(activeGameObject);
    }

    
}
