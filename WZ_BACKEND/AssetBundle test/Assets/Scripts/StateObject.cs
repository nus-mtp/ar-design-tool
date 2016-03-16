using UnityEngine;
using System.Collections;

public class StateObject : MonoBehaviour {
    public int id;
    public int transitionStateId;
    public bool isStateChanger;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void OnMouseDown()
    {
        if (isStateChanger)
        {
            AppStateManager.GetReference().changeState(transitionStateId);
        }
    }

#if UNITY_EDITOR
    public void SetUp(SerialStateObject sso)
    {
        gameObject.name = sso.instanceName;
        transform.position = sso.position.ToVector3();
        transform.rotation = sso.rotation.ToQuaternion();
        transform.localScale = sso.scale.ToVector3();
        transitionStateId = sso.transitionStateId;
        isStateChanger = sso.isStateChanger;
        id = sso.id;
    }
#endif
}
