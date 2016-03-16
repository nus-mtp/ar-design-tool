using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

public class StateManager : MonoBehaviour {

    private const string CURRENT_SELECTED_ITEM_TEXT = "Current Selected Item: ";
    private const string CURRENT_STATE_TEXT = "Current State:{0}";
    private const string PREVIEW_MODE_TEXT = "In Preview Mode";
    private const string EDIT_MODE_TEXT = "In Edit Mode";
    public const string CONTROL_SCRIPT_TAG = "ControlScripts";

    private ObjectCollection objectCollection;
    private Dictionary<int,State> stateList;
    private State activeState;
    private int stateNumber;
    private int nextStateId;
    private bool isPreview = false;
    private float initialAspectRatio;
    
    public Text currentSelectedDisplay;
    public Text stateNumberDisplay;
    public GameObject leftBlockOut;
    public GameObject rightBlockOut;

    void Start()
    {
        objectCollection = gameObject.GetComponent<ObjectCollection>();
        stateList = new Dictionary<int, State>();
        AddNewState();
        activeState = stateList[0];
        stateNumberDisplay.text = string.Format(CURRENT_STATE_TEXT, 0);
    }

    public void InitialzeStates(List<SerialState> serialStates)
    {
        nextStateId = 0;
        Dictionary<int, State>.Enumerator enumerator = stateList.GetEnumerator();
        while (enumerator.MoveNext())
        {
            enumerator.Current.Value.DestroyState();
        }
        stateList = new Dictionary<int, State>(); 
        foreach (SerialState serialState in serialStates)
        {
            State newState = new State(serialState, objectCollection);
            stateList.Add(newState.id, newState);
            activeState = newState;
            nextStateId = Mathf.Max(newState.id, nextStateId);
            newState.Hide();
        }
        activeState = stateList[0];
        nextStateId++;
        activeState.Show();
        stateNumberDisplay.text = string.Format(CURRENT_STATE_TEXT,0);
    }



    public List<int> GetStateIDs()
    {
        List<int> ids = new List<int>();
        Dictionary<int, State>.Enumerator enumerator = stateList.GetEnumerator();
        while (enumerator.MoveNext())
        {
            ids.Add(enumerator.Current.Value.id);
        }
        return ids;
    }


    public List<string> GetStateNames()
    {
        List<string> names = new List<string>();
        Dictionary<int, State>.Enumerator enumerator = stateList.GetEnumerator();
        while (enumerator.MoveNext())
        {
            names.Add(enumerator.Current.Value.name);
        }
        return names;
    }

    public void SwitchState(int toSwitch)
    {
        if (activeState != null)
        {
            activeState.Hide();
        }
        activeState = stateList[toSwitch];
        activeState.Show();
        SetActiveGameObject(GetActiveGameObject());
        stateNumberDisplay.text = string.Format(CURRENT_STATE_TEXT,toSwitch);
        stateNumber = toSwitch;
    }

    public State AddNewState()
    {
        State newState = new State(nextStateId);
        stateList.Add(nextStateId,newState);
        SwitchState(nextStateId);
        nextStateId++; 
        return newState;
    }

    public void AddToState(GameObject g)
    {
        activeState.AddToState(g);
        SetActiveGameObject(g);
    }

    public void ChangeStateName(int id, string newName)
    {
        State toChange = stateList[id];
        toChange.SetName(newName);
    }

    public void SetActiveGameObject(GameObject o)
    {
        if (isPreview)
        {
            return;
        }
        else
        {
            if (o == null)
            {
                currentSelectedDisplay.text = CURRENT_SELECTED_ITEM_TEXT;
            }
            else
            {
                string instanceName = activeState.SetActiveGameObject(o);
                if (instanceName != null)
                {
                    currentSelectedDisplay.color = Color.black;
                    currentSelectedDisplay.text = CURRENT_SELECTED_ITEM_TEXT + instanceName;
                }
            }
        }
    }

    public GameObject GetActiveGameObject()
    {
        return activeState.activeGameObject;
    }

    public void RemoveActiveObject()
    {
        activeState.RemoveActiveObject();
        currentSelectedDisplay.text = CURRENT_SELECTED_ITEM_TEXT;
    }

    public void DeleteState(int stateId)
    {
        Dictionary<int, State>.Enumerator enumerator = stateList.GetEnumerator();
         while (enumerator.MoveNext())
         {
             enumerator.Current.Value.RemoveLinks(stateId);
         }
        stateList.Remove(stateId);
    }
    
    public ProjectState ToSerial()
    {
        ProjectState project = new ProjectState();
        List<SerialState> serialStates = new List<SerialState>();
        Dictionary<int, State>.Enumerator enumerator = stateList.GetEnumerator();
       
        while (enumerator.MoveNext())
        {
            SerialState serialState = new SerialState(enumerator.Current.Value);
            serialStates.Add(serialState);
        }
        project.serialStates = serialStates;
        return project;
    }

    public void EnterPreview()
    {
        if (isPreview)
        {
            return;
        }
        else
        {
            isPreview = true;
            GameObject active = GetActiveGameObject();
            leftBlockOut.SetActive(true);
            rightBlockOut.SetActive(true);
            RectTransform left = leftBlockOut.GetComponent<RectTransform>();
            RectTransform right = rightBlockOut.GetComponent<RectTransform>();
            currentSelectedDisplay.text = PREVIEW_MODE_TEXT;
            float widthOfBLockOut = (Screen.width / 2) - (Screen.height * 9 / 32);
            left.sizeDelta = new Vector2(widthOfBLockOut, Screen.height);
            right.sizeDelta = new Vector2(widthOfBLockOut, Screen.height);
            if (active != null)
            {
                active.GetComponent<Transformable>().destroyElements();
            }

            Dictionary<int, State>.Enumerator enumerator = stateList.GetEnumerator();
            while (enumerator.MoveNext())
            {
               enumerator.Current.Value.SetPreview();
            }
        }
    }

    public void ExitPreview()
    {
        if (!isPreview)
        {
            return;
        }
        else
        {
            isPreview = false;
            GameObject active = GetActiveGameObject();
            leftBlockOut.SetActive(false);
            rightBlockOut.SetActive(false);
            currentSelectedDisplay.text = EDIT_MODE_TEXT;
            if (active != null)
            {
                active.GetComponent<Transformable>().initializeElements();
            }

            Dictionary<int, State>.Enumerator enumerator = stateList.GetEnumerator();
            while (enumerator.MoveNext())
            {
                enumerator.Current.Value.DisablePreview();
            }
        }
    }
}
