﻿using UnityEngine;
using UnityEngine.EventSystems;
using System.Collections;
using Vuforia;

public class TouchController : MonoBehaviour {
    
    private GameObject panel;

    public ModalPanel mp;
	public static bool objectIsFound = false;

	// Use this for initialization
	void Start () {
		panel = GameObject.FindGameObjectWithTag("Panel");
        panel.SetActive(true);
        if (!mp)
            mp = ModalPanel.Instance();
        mp.Close();
    }
	
	void Update () {
        if (CustomTrackerBehaviour.isTracked)
        {
            panel.SetActive(false);
			objectIsFound = true;
        }
        else
        {
            panel.SetActive(true);
			objectIsFound = false;
        }

        if (Input.GetMouseButtonDown(0)){ 
			Ray ray =Camera.main.ScreenPointToRay(Input.mousePosition);
			RaycastHit hit;
			if (Physics.Raycast(ray, out hit)){
                if(hit.collider)
                {
                    GameObject obj = hit.collider.gameObject;
                    AbstractTouchListener objListener = obj.GetComponent<AbstractTouchListener>();
                    Debug.Log(objListener);
                    if(objListener != null)
                    {
                        objListener.touchHandler(); 
                    }
                }
			}
		}
	}	
}
