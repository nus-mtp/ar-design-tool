using UnityEngine;
using System.Collections;

public class Preview : MonoBehaviour {

    private bool isPreview = false;
    private bool isStateChanger = false;
    private StateManager stateManager;
    private int transitionStateId;
    public void DisablePreview()
    {
        isPreview = false;
    }

    public void SetPreview(int transitionStateId, bool isStateChanger)
    {
        isPreview = true;
        this.transitionStateId = transitionStateId;
        this.isStateChanger = isStateChanger;
    }

    void OnMouseDown()
    {
        if (!isPreview)
        {
            return;
        }
        else
        {
            if (isStateChanger)
            {
                stateManager.SwitchState(transitionStateId);
            }
        }

    }

    void Start()
    {
        GameObject controlScripts = GameObject.FindGameObjectWithTag(StateManager.CONTROL_SCRIPT_TAG);
        stateManager = controlScripts.GetComponent<StateManager>();
    }
}
