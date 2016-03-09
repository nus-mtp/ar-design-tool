using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class State {
    const string GRID_TAG = "InSceneGrid";
    const string STATE_OBJECT_BUTTON_NAME = "StateObjectButton";
    const string DEFAULT_NAME = "NewState";
    
    public string name;
    public int id;
    public List<StateObject> stateObjects;
    public GameObject activeGameObject;
    public GameObject stateObjectButtonTemplate;
    public StateObject activeStateObject;
    public GameObject grid;

    public State(int id)
    {
        stateObjects = new List<StateObject>();
        grid = GameObject.FindGameObjectWithTag(GRID_TAG);
        stateObjectButtonTemplate = (GameObject)Resources.Load(STATE_OBJECT_BUTTON_NAME);
        this.id = id;
    }

    public State(SerialState ss)
    {
        stateObjects = new List<StateObject>();
        grid = GameObject.FindGameObjectWithTag(GRID_TAG);
        stateObjectButtonTemplate = (GameObject)Resources.Load(STATE_OBJECT_BUTTON_NAME);
        name = ss.name;
        id = ss.id;
    }

    public void SetName(string s)
    {
        name = s;
    }

    public void SetName(int n)
    {
        name = DEFAULT_NAME + n;
    }

    public void AddToState(GameObject g)
    {
        StateObject so = new StateObject(g);
        stateObjects.Add(so);
        CreateStateObjectButton(so);
    }

    public  void AddToState(StateObject so)
    {
        stateObjects.Add(so);
        CreateStateObjectButton(so);
    }

    private void CreateStateObjectButton(StateObject so)
    {
        GameObject button = MonoBehaviour.Instantiate(stateObjectButtonTemplate);
        button.transform.SetParent(grid.transform);
        so.button = button;
        StateObjectChanger objectChanger = button.GetComponent<StateObjectChanger>();
        objectChanger.AddStateObject(so);
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

    public void DestroyState()
    {
        if (activeGameObject != null)
        {
            Transformable t = activeGameObject.GetComponent<Transformable>();
            t.destroyElements();
        }
        foreach (StateObject s in stateObjects)
        {
            s.Destroy();
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
        stateObjects.Remove(activeStateObject);
        activeStateObject.Destroy();
    }

    
}
