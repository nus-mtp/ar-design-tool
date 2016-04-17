using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;

public class StateManager : MonoBehaviour
{

    public const string CONTROL_SCRIPT_TAG = "ControlScripts";
    public Text currentSelectedDisplay;
    public GameObject leftBlockOut;
    public GameObject rightBlockOut;
    public Text stateNumberDisplay;
    public bool isAssetBundleLoaded;

    private const string CURRENT_SELECTED_ITEM_TEXT = "Current Selected Item: ";
    private const string CURRENT_STATE_TEXT = "Current State:{0}";
    private const string EDIT_MODE_TEXT = "In Edit Mode";
    private const string PREVIEW_MODE_TEXT = "In Preview Mode";
    private State activeState;
    private float initialAspectRatio;
    private bool isPreview = false;
    private int nextStateId;
    private ModelCreator modelCreator;
    private Dictionary<int, State> stateList;
    private int stateNumber;
    private TextCreator textCreator;
    private int beforePreviewStateNumber;

    public State AddNewState()
    {
        State newState = new State(nextStateId);
        stateList.Add(nextStateId, newState);
        SwitchState(nextStateId);
        nextStateId++;
        return newState;
    }

    public void AddToActiveState(GameObject g, StateObjectType type)
    {
        activeState.AddToState(g, type);
        SetActiveGameObject(g);
    }

    public void ChangeStateName(int id, string newName)
    {
        State toChange = stateList[id];
        toChange.SetName(newName);
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

    public void EnterPreview()
    {
        if (isPreview)
        {
            return;
        }
        else
        {
            beforePreviewStateNumber = activeState.id;
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
            SwitchState(beforePreviewStateNumber);
            Dictionary<int, State>.Enumerator enumerator = stateList.GetEnumerator();
            while (enumerator.MoveNext())
            {
                enumerator.Current.Value.DisablePreview();
            }
        }
    }

    public GameObject GetActiveGameObject()
    {
        return activeState.activeGameObject;
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
            State newState = new State(serialState, modelCreator, textCreator);
            stateList.Add(newState.id, newState);
            activeState = newState;
            nextStateId = Mathf.Max(newState.id, nextStateId);
            newState.Hide();
        }
        activeState = stateList[0];
        nextStateId++;
        activeState.Show();
        stateNumberDisplay.text = string.Format(CURRENT_STATE_TEXT, 0);
    }

    public void RemoveActiveObject()
    {

        activeState.RemoveActiveObject();
        currentSelectedDisplay.text = CURRENT_SELECTED_ITEM_TEXT;
    }

    public List<StateObject> RequestClickable(int targetStateId)
    {
        return stateList[targetStateId].RequestClickable();
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

    public void SetActiveGameObject(int i)
    {
        if (isPreview)
        {
            return;
        }
        else
        {
            string instanceName = activeState.SetActiveGameObject(i);
            if (instanceName != null)
            {
                currentSelectedDisplay.color = Color.black;
                currentSelectedDisplay.text = CURRENT_SELECTED_ITEM_TEXT + instanceName;
            }

        }
    }

    public void SetTransitionId(int targetStateId, int targetStateObjectId, int transitionStateId)
    {
        stateList[targetStateId].SetTransitionId(targetStateObjectId, transitionStateId);
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
        stateNumberDisplay.text = string.Format(CURRENT_STATE_TEXT, toSwitch);
        stateNumber = toSwitch;
    }

    public SerialProjectState ToSerial()
    {
        SerialProjectState project = new SerialProjectState();
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

    public void UnSetTransitionId(int targetStateId, int targetStateObjectId)
    {
        stateList[targetStateId].UnSetTransitionId(targetStateObjectId);
    }

    void Start()
    {
        modelCreator = gameObject.GetComponent<ModelCreator>();
        textCreator = gameObject.GetComponent<TextCreator>();
        stateList = new Dictionary<int, State>();
        AddNewState();
        activeState = stateList[0];
        stateNumberDisplay.text = string.Format(CURRENT_STATE_TEXT, 0);
    }



    public string CreateJavaScriptJson()
    {
        JavaScriptProjectState jps = new JavaScriptProjectState(stateList, modelCreator.GetNames());
        return jps.toJson();
    }

    public void DeleteGameObject(int targetStateObjectId)
    {
        activeState.DeleteGameObject(targetStateObjectId);
        currentSelectedDisplay.text = CURRENT_SELECTED_ITEM_TEXT; 
    }
}
