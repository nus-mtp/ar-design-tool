using UnityEngine;
using System.Collections;

public class ToDelete : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update ()
    {
        Debug.Log(CameraProperties.fget(CameraProperties.EULER_ROTATION_Z).ToString());
	}
}
