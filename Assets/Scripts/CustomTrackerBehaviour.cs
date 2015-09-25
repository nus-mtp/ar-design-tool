using UnityEngine;
using System.Collections;
using Vuforia;

public class CustomTrackerBehaviour : MonoBehaviour, ITrackableEventHandler {
    private TrackableBehaviour mTrackableBehaviour;
    public static bool isTracked = false;

    #region Do not edit methods area

    void Start()
    {
        mTrackableBehaviour = GetComponent<TrackableBehaviour>();
        if (mTrackableBehaviour)
        {
            mTrackableBehaviour.RegisterTrackableEventHandler(this);
        }
    }

    public void OnTrackableStateChanged(TrackableBehaviour.Status previousStatus, 
                                         TrackableBehaviour.Status newStatus)
    {
        if (newStatus == TrackableBehaviour.Status.DETECTED ||
                newStatus == TrackableBehaviour.Status.TRACKED ||
                newStatus == TrackableBehaviour.Status.EXTENDED_TRACKED)
        {
            CustomOnTrackingFound();
        }
        else
        {
            CustomOnTrackingLost();
        }
    }

    protected void CustomOnTrackingFound()
    {
        Renderer[] rendererComponents = GetComponentsInChildren<Renderer>(true);
        Collider[] colliderComponents = GetComponentsInChildren<Collider>(true);
        
        foreach (Renderer component in rendererComponents)
        {
            component.enabled = true;
        }
        
        foreach (Collider component in colliderComponents)
        {
            component.enabled = true;
        }

        Debug.Log("Object is found");

        OnTrackerFoundHandler();

        isTracked = true; 
    }

    protected void CustomOnTrackingLost()
    {
        Renderer[] rendererComponents = GetComponentsInChildren<Renderer>(true);
        Collider[] colliderComponents = GetComponentsInChildren<Collider>(true);
        
        foreach (Renderer component in rendererComponents)
        {
            component.enabled = false;
        }
        
        foreach (Collider component in colliderComponents)
        {
            component.enabled = false;
        }

        Debug.Log("Object is not found");

        OnTrackerLostHandler();

        isTracked = false;
    }

    #endregion
    
    private void OnTrackerFoundHandler()
    {
        // From Wenzhao
        Canvas canvasObject = (Canvas)FindObjectOfType(typeof(Canvas));
        {
            canvasObject.enabled = true;
        }
    }

    private void OnTrackerLostHandler()
    {
        // From Wenzhao
        Canvas canvasObject = (Canvas)FindObjectOfType(typeof(Canvas));
        {
            canvasObject.enabled = false;
        }
    }
}