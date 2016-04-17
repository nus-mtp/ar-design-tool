using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class State
{
    public GameObject activeGameObject;
    public StateObject activeStateObject;
    public GameObject grid;
    public int id;
    public bool isPreview;
    public string name;
    public GameObject stateObjectButtonTemplate;
    public Dictionary<int, StateObject> stateObjects;
    const string DEFAULT_NAME = "NewState";
    const string GRID_TAG = "InSceneGrid";
    const string STATE_OBJECT_BUTTON_NAME = "StateObjectButton";
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

    public State(SerialState ss, ModelCreator objectCollection, TextCreator textCreator)
    {
        stateObjects = new Dictionary<int, StateObject>();
        grid = GameObject.FindGameObjectWithTag(GRID_TAG);
        stateObjectButtonTemplate = (GameObject)Resources.Load(STATE_OBJECT_BUTTON_NAME);
        name = ss.name;
        id = ss.id;
        InitializeStateObjects(ss, objectCollection, textCreator);
    }

    public void AddToState(GameObject g, StateObjectType type)
    {
        StateObject so = new StateObject(g, type);
        so.id = nextStateObjectId;
        stateObjects.Add(so.id, so);
        nextStateObjectId++;
        //CreateStateObjectButton(so);
    }

    public void AddToState(StateObject so)
    {
        stateObjects.Add(so.id, so);
        //CreateStateObjectButton(so);
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

    public void DisablePreview()
    {
        isPreview = false;
        Dictionary<int, StateObject>.Enumerator enumerator = stateObjects.GetEnumerator();
        while (enumerator.MoveNext())
        {
            enumerator.Current.Value.DisablePreview();
        }
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

    public void RemoveActiveObject()
    {
        if (activeGameObject != null)
        {
            stateObjects.Remove(activeStateObject.id);
            activeStateObject.Destroy();
        }
    }

    public void RemoveLinks(int stateId)
    {
        Dictionary<int, StateObject>.Enumerator enumerator = stateObjects.GetEnumerator();
        while (enumerator.MoveNext())
        {
            StateObject s = enumerator.Current.Value;
            s.RemoveLink(stateId);
        }
    }

    public List<StateObject> RequestClickable()
    {
        List<StateObject> clickables = new List<StateObject>();
        Dictionary<int, StateObject>.Enumerator enumerator = stateObjects.GetEnumerator();
        while (enumerator.MoveNext())
        {
            StateObject s = enumerator.Current.Value;
            clickables.Add(s);
        }
        return clickables;
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

    public string SetActiveGameObject(int i)
    {
        string instanceName = null;
        StateObject s = stateObjects[i];
        if (activeGameObject != null)
        {
            activeGameObject.GetComponent<Transformable>().destroyElements();
        }
        activeGameObject = s.gameObject;
        activeStateObject = s;
        activeGameObject.GetComponent<Transformable>().initializeElements();
        instanceName = s.instanceName;
        return instanceName;
    }

    public void SetName(string newName)
    {
        name = newName;
    }

    public void SetName(int n)
    {
        name = DEFAULT_NAME + n;
    }

    public void SetPreview()
    {
        isPreview = true;
        Dictionary<int, StateObject>.Enumerator enumerator = stateObjects.GetEnumerator();
        while (enumerator.MoveNext())
        {
            enumerator.Current.Value.SetPreview();
        }
    }

    public void SetStateObjectName(string newName, int id)
    {
        stateObjects[id].SetName(newName);
    }

    public void SetTransitionId(int targetStateObjectId, int transitionStateId)
    {
        stateObjects[targetStateObjectId].SetTransition(transitionStateId);
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
            if (t != null && !isPreview)
            {
                t.initializeElements();
            }
        }
    }

    public void UnSetTransitionId(int targetStateObjectId)
    {
        stateObjects[targetStateObjectId].UnSetTransition();
    }

    private void CreateStateObjectButton(StateObject so)
    {
        GameObject button = MonoBehaviour.Instantiate(stateObjectButtonTemplate);
        button.transform.SetParent(grid.transform);
        so.button = button;
        StateObjectChanger objectChanger = button.GetComponent<StateObjectChanger>();
        so.stateObjectChanger = objectChanger;
        objectChanger.AddStateObject(so);
    }

    private void InitializeStateObjects(SerialState serialState, ModelCreator modelCreator, TextCreator textCreator)
    {
        foreach (SerialStateObject s in serialState.stateObjects)
        {
            GameObject toSpawn;
            if (s.type == StateObjectType.Model)
            {
                GameObject template = modelCreator.GetModel(s.modelName);
                toSpawn = MonoBehaviour.Instantiate(template);


            }
            else
            {
                toSpawn = textCreator.LoadText(s.modelName);
            }

            StateObject stateObject = new StateObject(toSpawn, s.type);
            s.InitializeStateObject(stateObject);
            AddToState(stateObject);
            nextStateObjectId = Mathf.Max(s.id, nextStateObjectId);
        }
        nextStateObjectId++;
    }

    public void DeleteGameObject(int targetStateObjectId)
    {
            StateObject toDestroy = stateObjects[targetStateObjectId];
            stateObjects.Remove(targetStateObjectId);
            toDestroy.Destroy();
    }
}
