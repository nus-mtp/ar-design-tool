using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Vuforia;

public class GUIDebugScript : MonoBehaviour {

    private string log;
    private Text self;
    private TrackableBehaviour mTrackableBehaviour;
    private GameObject mTarget;

	// Use this for initialization
	void Start () {
        self = GetComponent<Text>();
        self.text = "";
        log = "";
        mTrackableBehaviour = GetComponent<TrackableBehaviour>();
        mTarget = GameObject.FindGameObjectWithTag("MainTarget");
	}
	
	// Update is called once per frame
	void Update () {
        StateManager sm = TrackerManager.Instance.GetStateManager();
        IEnumerable<TrackableBehaviour> activeTrackables = sm.GetActiveTrackableBehaviours();
        log = "";
        /*
        int numFrameMarkers = 0;
        int numImageTargets = 0;
        int numMultiTargets = 0;
        int numObjectTargets = 0;
        foreach (TrackableBehaviour tb in activeTrackables)
        {
            if (tb is MarkerBehaviour)
                numFrameMarkers++;
            else if (tb is ImageTargetBehaviour)
                numImageTargets++;
            else if (tb is MultiTargetBehaviour)
                numMultiTargets++;
            else if (tb is ObjectTargetBehaviour)
                numObjectTargets++;
        }
        */

        
        if (CustomTrackerBehaviour.isTracked)
        {
            Quaternion q;
            List<TrackableBehaviour> tb = activeTrackables.ToList<TrackableBehaviour>();
            q = tb[0].transform.rotation;
            log += "Object is found\n";
            log += q.ToString();
        }
        else
        {
            log += "Object is not found\n";
        }
        self.text = log;
    }
}
