using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class State
{
    const string GRID_TAG = "InSceneGrid";
    const string STATE_OBJECT_BUTTON_NAME = "StateObjectButton";
    const string DEFAULT_NAME = "NewState";

    public string name;
    public int id;
    public Dictionary<int, StateObject> stateObjects;
    public GameObject activeGameObject;
    public GameObject stateObjectButtonTemplate;
    public StateObject activeStateObject;
    public GameObject grid;

    private int nextStateObjectId;

    public State(int id)
    {
        stateObjects = new Dictionary<int, StateObject>();
        grid = GameObject.FindGameObjectWithTag(GRID_TAG);
        stateObjectButtonTemplate = (GameObject)Resources.Load(STATE_OBJECT_BUTTON_NAME);
        this.id = id;
        SetName(id);
        nextStateObjectId = 0;
    }

    public State(SerialState ss, ObjectCollection objectCollection)
    {
        stateObjects = new Dictionary<int, StateObject>();
        grid = GameObject.FindGameObjectWithTag(GRID_TAG);
        stateObjectButtonTemplate = (GameObject)Resources.Load(STATE_OBJECT_BUTTON_NAME);
        name = ss.name;
        id = ss.id;
        InitializeStateObjects(ss, objectCollection);
    }

    private void InitializeStateObjects(SerialState serialState, ObjectCollection objectCollection)
    {
        foreach (SerialStateObject s in serialState.stateObjects)
        {
            foreach (GameObject g in objectCollection.GetUserObjects())
            {
                if (g.name.Equals(s.modelName))
                {
                    GameObject toSpawn = MonoBehaviour.Instantiate(g);
                    StateObject stateObject = new StateObject(toSpawn);
                    s.InitializeStateObject(stateObject);
                    AddToState(stateObject);
                    nextStateObjectId = Mathf.Max(s.id, nextStateObjectId);
                    Debug.Log(id + ", "  +s.id);
                    break;
                }
            }
        }
        nextStateObjectId++;
    }

    public void SetName(string newName)
    {
        name = newName;
    }

    public void SetName(int n)
    {
        name = DEFAULT_NAME + n;
    }

    public void SetStateObjectName(string newName, int id)
    {
        stateObjects[id].SetName(newName);
    }

    public void AddToState(GameObject g)
    {
        StateObject so = new StateObject(g);
        so.id = nextStateObjectId; 
        stateObjects.Add(so.id, so);
        nextStateObjectId++;
        CreateStateObjectButton(so);
    }

    public void AddToState(StateObject so)
    {
        stateObjects.Add(so.id, so);
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
        Dictionary<int, StateObject>.Enumerator enumerator = stateObjects.GetEnumerator();
        while (enumerator.MoveNext())
        {
            StateObject s = enumerator.Current.Value;
            if (o == s.gameObject)
            {
                if (activeGameObject != null)
                {
                    activeGameObject.GetComponent<Transformable>().destroyElements();
                }
                activeGameObject = s.gameObject;
                activeStateObject = s;
                activeGameObject.GetComponent<Transformable>().initializeElements();
                instanceName = s.instanceName;
                break;
            }
        }

        return instanceName;
    }

    public void Hide()
    {
        Dictionary<int, StateObject>.Enumerator enumerator = stateObjects.GetEnumerator();
        while (enumerator.MoveNext())
        {
            enumerator.Current.Value.Hide();
        }
        if (activeGameObject != null)
        {
            Transformable t = activeGameObject.GetComponent<Transformable>();
            if (t != null)
            {
                t.destroyElements();
            }
        }
    }

    public void DestroyState()
    {
        if (activeGameObject != null)
        {
            Transformable t = activeGameObject.GetComponent<Transformable>();
            t.destroyElements();
        }
        Dictionary<int, StateObject>.Enumerator enumerator = stateObjects.GetEnumerator();
        while (enumerator.MoveNext())
        {
            enumerator.Current.Value.Destroy();
        }

    }

    public void Show()
    {
        Dictionary<int, StateObject>.Enumerator enumerator = stateObjects.GetEnumerator();
        while (enumerator.MoveNext())
        {
            enumerator.Current.Value.Show();
        }
        if (activeGameObject != null)
        {

            Transformable t = activeGameObject.GetComponent<Transformable>();
            if (t != null)
            {
                t.initializeElements();
            }
        }
    }

    public void RemoveActiveObject()
    {
        stateObjects.Remove(activeStateObject.id);
        activeStateObject.Destroy();
    }

    public void SetPreview()
    {
        Dictionary<int, StateObject>.Enumerator enumerator = stateObjects.GetEnumerator();
        while (enumerator.MoveNext())
        {
            enumerator.Current.Value.SetPreview();
        }
    }

    public void DisablePreview()
    {
        Dictionary<int, StateObject>.Enumerator enumerator = stateObjects.GetEnumerator();
        while (enumerator.MoveNext())
        {
            enumerator.Current.Value.DisablePreview();
        }
    }

    public void RemoveLinks(int stateId)
    {
        throw new System.NotImplementedException();
    }
}
